/**
 * Moves the dialogues of an rr0.org page (`<blockquote>` holding `<p class="question">` / `<p class="answer">`) into interview files read by
 * `<rr0-interview>` (UFO@home's InterviewElement), one file per blockquote, written beside the page.
 *
 * What was said is read from the GENERATED page (`out/…`), where the build has already turned people, places, dates and sources into links, and
 * kept as the HTML it is: the interview file says who speaks and when, and leaves the rest to HTML. Who speaks is the name a turn starts with (`<strong>Blackwell</strong> :`), kept
 * for the turns of the same kind that follow; else the interviewer (`--interviewer`, else the page's first `author`) for a question and
 * `--interviewee` for an answer.
 *
 * Without `--apply` it only says what it would do (and, with `--preview <dir>`, writes the files there). With it, it writes the files and replaces each blockquote of the SOURCE page by the element
 * (the figures it held put before it), adding the script that defines the element once.
 *
 *   npx tsx scripts/InterviewMigration.ts time/2/0/0/6/03/Vallee_SubRosa/index_fr.html --interviewee ValleeJacques [--apply]
 *
 * A turn that starts with a name (`<strong>Bourret</strong> :`) is that person's: `--speaker Bourret=BourretJeanClaude` (repeated) says who
 * they are, else they are known by the name alone. What the dialogue holds besides paragraphs and figures would be lost: `--apply` refuses it.
 *
 * A dialogue written as paragraphs that start with who speaks in bold (`<p><strong>SR</strong>: …`) is read with `--prefixes SR,JV`, the name
 * that asks then the one that answers: from such a paragraph through the paragraphs that follow it, those without a name staying with the last
 * speaker.
 */
import { JSDOM } from "jsdom"
import fs from "node:fs"
import path from "node:path"

interface Speaker {
  role: string
  by?: { people: string }
  title?: string
}

interface Segment {
  speaker: string
  /** What was said, as the HTML the page has it. */
  text: string
}

interface Options {
  apply: boolean
  /** Where to write the files instead, the page left as it is. */
  preview?: string
  interviewer?: string
  interviewee?: string
  /**
   * For a dialogue written as paragraphs that start with who speaks in bold (`<p><strong>SR</strong>: …`) rather than as a blockquote of
   * questions and answers: the name that asks, then the name that answers.
   */
  prefixes?: [string, string]
  /** Who a name that starts a turn is (`Bourret` is BourretJeanClaude), as `--speaker Bourret=BourretJeanClaude`, repeated. */
  speakers?: Record<string, string>
  /**
   * Whether a turn without a name is the last one named of its kind (true, the default), or the default speaker of its kind: with several
   * people answering (a hearing), who an unnamed answer is cannot be told (`--follow-names no`).
   */
  follow?: boolean
}

export class InterviewMigration {
  static readonly SCRIPT = `<script src="https://ufoathome.org/lib/rr0-interview.mjs" type="module"></script>`
  static readonly DIALOGUE = /class="(question|answer)"/

  readonly warnings: string[] = []
  /** What the migration would lose: `--apply` refuses while there is any. */
  readonly errors: string[] = []

  constructor(private readonly page: string, private readonly options: Options) {
  }

  /** A person's RR0 id from how a page names them: "Ross Coulthart" (or "Coulthart, Ross", or "Mr. Coulthart") is CoulthartRoss. */
  static peopleId(name: string): string {
    const comma = name.indexOf(",")
    if (comma > 0) name = `${name.slice(comma + 1)} ${name.slice(0, comma)}`
    const words = name.trim().replace(/^(Mr|Mrs|Ms|Dr|Pr|Sen|Rep|M|Mme|Mlle)\.?\s+/i, "").split(/\s+/)
    const plain = (word: string): string => word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9-]/g, "")
    // Who is no person's name ("Fille 2", "Apollo 11") keeps its words in their order.
    if (/\d/.test(name)) return words.map(plain).join("")
    const last = words.pop() ?? ""
    return [last, ...words].map(plain).join("")
  }

  /**
   * How a person of RR0 is named, from their `people.json` beside their page: first names (theirs, else those the id ends with) then the last
   * name as written, accents included (`ValleeJacques` is Jacques Vallée). Undefined when they have no page.
   */
  static peopleName(id: string): string | undefined {
    const file = path.join("people", id[0].toLowerCase(), id, "people.json")
    if (!fs.existsSync(file)) return undefined
    const json = JSON.parse(fs.readFileSync(file, "utf8")) as { firstNames?: string[], lastName?: string, title?: string, surname?: string }
    // Who goes by a nickname is named by it ("Lonnie Zamora").
    if (json.surname) return `${json.surname} ${json.lastName ?? id.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ")[0]}`
    // Without names, the title the person's page is given, in its JSON or as its <title>.
    if (!json.firstNames && !json.lastName) {
      const page = path.join(path.dirname(file), "index.html")
      const title = (fs.existsSync(page) ? /<title>([^<]+)<\/title>/.exec(fs.readFileSync(page, "utf8"))?.[1].replace(/\s+/g, " ").trim() : undefined) ?? json.title
      if (title) return title
    }
    const plain = (text: string): string => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z]/g, "")
    const last = json.lastName ?? id.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ")[0]
    const firsts = json.firstNames ?? (id.startsWith(plain(last)) ? id.slice(plain(last).length).replace(/([a-z])([A-Z])/g, "$1 $2").split(" ").filter(Boolean) : [])
    return [...firsts, last].join(" ")
  }

  /** What a paragraph says, as the HTML the generated page has (its links resolved); a leading `Name :` taken off and returned as who speaks. */
  private saidOf(p: Element): { name?: string, text: string } {
    let name: string | undefined
    const first = [...p.childNodes].find(node => node.nodeType !== 3 || node.textContent!.trim() !== "")
    // A name in bold, or a person the build has linked (`<span class="people">Martins</span> :`).
    const isName = (node: ChildNode): boolean => node.nodeType === 1 && (["STRONG", "B"].includes((node as Element).tagName)
      || (node as Element).matches("span.people-resolved, span.people")
      || ((node as Element).tagName === "A" && (node as Element).children.length === 1 && ["STRONG", "B"].includes((node as Element).children[0].tagName)))
    if (first && isName(first)) {
      const next = first.nextSibling
      // The name may be followed by how they speak, kept: `<b>Barney</b> (yeux fermés) : …`.
      const after = next?.nodeType === 3 ? /^\s*(\([^)]*\))?\s*[:;]/.exec(next.textContent!) : null
      if (after) {
        name = first.textContent!.trim()
        next!.textContent = (after[1] ? `${after[1]} ` : "") + next!.textContent!.slice(after[0].length).trimStart()
        first.remove()
      }
    }
    for (const note of p.querySelectorAll(".note")) this.warnings.push(`a note kept in the text: ${note.textContent!.trim().slice(0, 60)}`)
    // A quotation in the run of the text is a <q>: a <cite> or an epigraph there is to check by hand.
    for (const cite of p.querySelectorAll("cite, .exergue")) this.warnings.push(`a <${cite.tagName.toLowerCase()}> to check (a quotation is a <q>): ${cite.textContent!.trim().slice(0, 60)}`)
    // The source's own line breaks and indents are not what was said.
    let text = p.innerHTML.replace(/\s+/g, " ").replace(/ ?<br ?\/?> ?/g, "<br>").trim()
    // What a named speaker says, set as a quotation, is what they say: a turn is no quotation.
    const quoted = /^<q>(.*?)<\/q>$/.exec(text)
    if (name && quoted && !quoted[1].includes("<q>")) text = quoted[1].trim()
    return { name, text }
  }

  /** A speaker of a role, who is the person `people` (an RR0 id) when known, named as their page names them. */
  private static speaker(role: string, people: string | undefined): Speaker {
    if (!people) return { role }
    const title = InterviewMigration.peopleName(people)
    return { role, by: { people }, ...(title ? { title } : {}) }
  }

  /** The interview a dialogue holds: a blockquote's children, or a run of paragraphs. */
  private interviewOf(children: Element[], document: Document): Record<string, unknown> {
    const speakers: Record<string, Speaker> = {}
    const segments: Segment[] = []
    const author = document.querySelector('meta[name="author"]')?.getAttribute("content") ?? undefined
    const interviewer = this.options.interviewer ?? (author ? InterviewMigration.peopleId(author) : undefined)
    const defaults: Record<string, { id: string, speaker: Speaker }> = {
      question: { id: "interviewer", speaker: InterviewMigration.speaker("interviewer", interviewer) },
      answer: { id: "interviewee", speaker: InterviewMigration.speaker("interviewee", this.options.interviewee) }
    }
    const named: Record<string, string | undefined> = {}
    let previous: string | undefined
    const prefixes = this.options.prefixes
    for (const child of children) {
      // A <q> of a question or an answer right in the dialogue is a paragraph mistyped.
      // A list goes on with the turn before it; a line break between turns says nothing.
      if (["OL", "UL"].includes(child.tagName) && segments.length > 0) {
        segments[segments.length - 1].text += child.outerHTML.replace(/\s+/g, " ").replace(/> </g, "><")
        continue
      }
      if (child.tagName === "BR") continue
      if (child.tagName !== "P" && !(child.tagName === "Q" && child.matches(".question, .answer"))) {
        // A figure is put before the element, a source after it; anything else would be lost.
        if (child.tagName !== "FIGURE" && !child.matches("span.source, span.source-id")) this.errors.push(`a <${child.tagName.toLowerCase()}> in the dialogue would be lost: ${child.textContent!.trim().slice(0, 60)}`)
        continue
      }
      const said0 = this.saidOf(child)
      // Who speaks may be given as an attribute (`<p class="answer" data-author="Kewper">`).
      const name = said0.name ?? child.getAttribute("data-author") ?? undefined
      const text = said0.text
      // Who speaks: the paragraph's class, or the name it starts with when the page writes it that way.
      const kind = prefixes
        ? (name === prefixes[0] ? "question" : name === prefixes[1] ? "answer" : undefined)
        : child.classList.contains("question") ? "question" : child.classList.contains("answer") ? "answer" : undefined
      if (!kind && !name) this.warnings.push(`a paragraph that is neither question nor answer, given to the previous speaker: ${child.textContent!.trim().slice(0, 60)}`)
      let id: string
      if (kind && name && !prefixes) named[kind] = name
      const said = kind ? (this.options.follow === false ? (name && !prefixes ? name : undefined) : named[kind]) : undefined
      const people = said ? this.options.speakers?.[said] : undefined
      // A name that says who the default speaker of its kind is keeps them one speaker.
      if (said && people && people === defaults[kind!].speaker.by?.people) {
        id = defaults[kind!].id
        speakers[id] ??= defaults[kind!].speaker
      } else if (said) {
        id = people ?? InterviewMigration.peopleId(said)
        speakers[id] ??= people ? InterviewMigration.speaker(defaults[kind!].speaker.role, people) : { role: defaults[kind!].speaker.role, title: said }
      } else if (kind) {
        id = defaults[kind].id
        speakers[id] ??= defaults[kind].speaker
      } else if (name) {
        // A paragraph of neither kind that names who speaks is theirs.
        const known = Object.entries(named).find(([, other]) => other === name)?.[0]
        const people = this.options.speakers?.[name]
        const asDefault = people ? Object.values(defaults).find(other => other.speaker.by?.people === people) : undefined
        if (asDefault) {
          id = asDefault.id
          speakers[id] ??= asDefault.speaker
        } else if (known) {
          id = people && people === defaults[known].speaker.by?.people ? defaults[known].id : people ?? InterviewMigration.peopleId(name)
        } else {
          id = people ?? InterviewMigration.peopleId(name)
          speakers[id] ??= people ? InterviewMigration.speaker("interviewee", people) : { role: "interviewee", title: name }
        }
      } else id = previous ?? defaults.answer.id
      speakers[id] ??= defaults.answer.speaker
      previous = id
      if (text === "") continue
      segments.push({ speaker: id, text })
    }
    const lang = document.documentElement.getAttribute("lang") ?? (this.page.includes("_fr.") ? "fr" : undefined)
    const title = document.querySelector("title")?.textContent?.trim()
    return {
      version: 1,
      ...(lang ? { language: lang } : {}),
      ...(title ? { title } : {}),
      speakers,
      transcription: { method: "manual", note: `Migrated from the dialogue of ${this.page}.` },
      segments
    }
  }

  /** Whether a paragraph starts with one of the names in bold, then a colon. */
  private static startsWith(p: Element, names: string[]): boolean {
    const first = [...p.childNodes].find(node => node.nodeType !== 3 || node.textContent!.trim() !== "")
    return !!first && first.nodeType === 1 && ["STRONG", "B"].includes((first as Element).tagName)
      && names.includes(first.textContent!.trim()) && /^\s*:/.test(first.nextSibling?.textContent ?? "")
  }

  /** The runs of paragraphs that make a dialogue: from a paragraph starting with a name, through the paragraphs that follow it. */
  private prefixedRuns(document: Document, prefixes: string[]): Element[][] {
    const runs: Element[][] = []
    for (const p of document.querySelectorAll("p")) {
      if (!InterviewMigration.startsWith(p, prefixes) || runs.some(run => run.includes(p))) continue
      const run: Element[] = []
      for (let node: Element | null = p; node?.tagName === "P"; node = node.nextElementSibling) run.push(node)
      runs.push(run)
    }
    return runs
  }

  /** Where each run of paragraphs is in the source page, as matches, the n-th run holding `lengths[n]` paragraphs. */
  private prefixedSource(source: string, prefixes: string[], lengths: number[]): RegExpMatchArray[] {
    const start = new RegExp(`<p>\\s*<(strong|b)>(${prefixes.join("|")})</(strong|b)>\\s*:`, "g")
    const matches: RegExpMatchArray[] = []
    let from = 0
    for (const length of lengths) {
      start.lastIndex = from
      const first = start.exec(source)
      if (!first) break
      let end = first.index
      for (let count = 0; count < length; count++) {
        const paragraph = /^\s*<p[\s>][\s\S]*?<\/p>/.exec(source.slice(end))
        if (!paragraph) throw new Error(`${this.page}: the source has fewer paragraphs than the generated page`)
        end += paragraph[0].length
      }
      const match = [source.slice(first.index, end)] as RegExpMatchArray
      match.index = first.index
      matches.push(match)
      from = end
    }
    return matches
  }

  /** What each dialogue of the page becomes; the source page itself when applied. */
  run(): void {
    const generated = fs.readFileSync(path.join("out", this.page), "utf8")
    const document = new JSDOM(generated).window.document
    const prefixes = this.options.prefixes
    const dialogues = prefixes ? this.prefixedRuns(document, prefixes) : [...document.querySelectorAll("blockquote")]
      .filter(quote => quote.querySelector(":scope > p.question, :scope > p.answer")).map(quote => [...quote.children])
    if (dialogues.length === 0) throw new Error(`${this.page}: no dialogue`)
    const dir = path.dirname(this.page)
    const base = path.basename(this.page, ".html").replace(/^index/, "")
    const names = dialogues.map((_, index) => `interview${base}${dialogues.length > 1 ? `-${index + 1}` : ""}.json`)
    const interviews = dialogues.map(quote => this.interviewOf(quote, document))
    let source = fs.readFileSync(this.page, "utf8")
    const quotes = prefixes ? this.prefixedSource(source, prefixes, dialogues.map(run => run.length))
      // The innermost blockquotes: a dialogue may be quoted within a longer quotation.
      : [...source.matchAll(/<blockquote[^>]*>(?:(?!<blockquote)[\s\S])*?<\/blockquote>/g)].filter(match => InterviewMigration.DIALOGUE.test(match[0]))
    if (quotes.length !== dialogues.length) throw new Error(`${this.page}: ${quotes.length} dialogues in the source, ${dialogues.length} in the generated page`)
    for (const match of quotes) {
      // A blockquote left open before the dialogue would make the match swallow what is around it.
      const count = (pattern: RegExp): number => (match[0].match(pattern) ?? []).length
      if (count(/<figure[\s>]/g) !== count(/<\/figure>/g) || count(/<section[\s>]/g) !== count(/<\/section>/g) || count(/<blockquote[\s>]/g) !== 1) {
        throw new Error(`${this.page}: a dialogue of the source is not a whole blockquote (an unclosed tag around it?)`)
      }
    }
    for (const [index, match] of [...quotes.entries()].reverse()) {
      const figures = [...match[0].matchAll(/<figure[\s\S]*?<\/figure>/g)].map(figure => figure[0] + "\n")
      const sources = [...match[0].matchAll(/^\s*(<span class="source"[\s\S]*?<\/span>)\s*$/gm)].map(source => `\n<p>${source[1]}</p>`)
      const element = `${figures.join("")}<rr0-interview src="${names[index]}"></rr0-interview>${sources.join("")}`
      source = source.slice(0, match.index) + element + source.slice(match.index! + match[0].length)
    }
    if (!source.includes(InterviewMigration.SCRIPT)) source = source.replace(/(<rr0-interview )/, `${InterviewMigration.SCRIPT}\n$1`)
    interviews.forEach((interview, index) => {
      const segments = interview.segments as Segment[]
      console.log(`${path.join(dir, names[index])}: ${segments.length} turns, speakers ${Object.keys(interview.speakers as object).join(", ")}`)
    })
    for (const warning of new Set(this.warnings)) console.warn(`  ! ${warning}`)
    for (const error of new Set(this.errors)) console.warn(`  !! ${error}`)
    interviews.forEach(interview => console.log(`  speakers: ${JSON.stringify(interview.speakers)}`))
    if (this.options.preview) {
      fs.mkdirSync(this.options.preview, { recursive: true })
      interviews.forEach((interview, index) => fs.writeFileSync(path.join(this.options.preview!, names[index]), JSON.stringify(interview, null, 2) + "\n"))
    }
    if (!this.options.apply) return
    if (this.errors.length > 0) throw new Error(`${this.page}: not applied, the dialogue holds what would be lost`)
    interviews.forEach((interview, index) => fs.writeFileSync(path.join(dir, names[index]), JSON.stringify(interview, null, 2) + "\n"))
    fs.writeFileSync(this.page, source)
  }

  static main(args: string[]): void {
    const value = (flag: string): string | undefined => {
      const at = args.indexOf(flag)
      return at < 0 ? undefined : args[at + 1]
    }
    const pages = args.filter((arg, index) => !arg.startsWith("--") && !["--interviewer", "--interviewee", "--preview", "--prefixes", "--speaker", "--follow-names"].includes(args[index - 1]))
    const speakers = Object.fromEntries(args.flatMap((arg, index) => arg === "--speaker" ? [args[index + 1].split("=")] : []))
    const prefixes = value("--prefixes")?.split(",") as [string, string] | undefined
    for (const page of pages) {
      new InterviewMigration(page, { apply: args.includes("--apply"), interviewer: value("--interviewer"), interviewee: value("--interviewee"), preview: value("--preview"), prefixes, speakers, follow: value("--follow-names") !== "no" }).run()
    }
  }
}

InterviewMigration.main(process.argv.slice(2))
