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
}

export class InterviewMigration {
  static readonly SCRIPT = `<script src="https://ufoathome.org/lib/rr0-interview.mjs" type="module"></script>`
  static readonly DIALOGUE = /class="(question|answer)"/

  readonly warnings: string[] = []

  constructor(private readonly page: string, private readonly options: Options) {
  }

  /** A person's RR0 id from how a page names them: "Ross Coulthart" is CoulthartRoss. */
  static peopleId(name: string): string {
    const words = name.trim().split(/\s+/)
    const last = words.pop() ?? ""
    return [last, ...words].map(word => word.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z-]/g, "")).join("")
  }

  /**
   * How a person of RR0 is named, from their `people.json` beside their page: first names (theirs, else those the id ends with) then the last
   * name as written, accents included (`ValleeJacques` is Jacques Vallée). Undefined when they have no page.
   */
  static peopleName(id: string): string | undefined {
    const file = path.join("people", id[0].toLowerCase(), id, "people.json")
    if (!fs.existsSync(file)) return undefined
    const json = JSON.parse(fs.readFileSync(file, "utf8")) as { firstNames?: string[], lastName?: string }
    const plain = (text: string): string => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z]/g, "")
    const last = json.lastName ?? id.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ")[0]
    const firsts = json.firstNames ?? (id.startsWith(plain(last)) ? id.slice(plain(last).length).replace(/([a-z])([A-Z])/g, "$1 $2").split(" ").filter(Boolean) : [])
    return [...firsts, last].join(" ")
  }

  /** What a paragraph says, as the HTML the generated page has (its links resolved); a leading `Name :` taken off and returned as who speaks. */
  private saidOf(p: Element): { name?: string, text: string } {
    let name: string | undefined
    const first = [...p.childNodes].find(node => node.nodeType !== 3 || node.textContent!.trim() !== "")
    if (first && first.nodeType === 1 && ["STRONG", "B"].includes((first as Element).tagName)) {
      const next = first.nextSibling
      if (next?.nodeType === 3 && /^\s*:/.test(next.textContent!)) {
        name = first.textContent!.trim()
        next.textContent = next.textContent!.replace(/^\s*:\s*/, "")
        first.remove()
      }
    }
    for (const note of p.querySelectorAll(".note")) this.warnings.push(`a note kept in the text: ${note.textContent!.trim().slice(0, 60)}`)
    // A quotation in the run of the text is a <q>: a <cite> or an epigraph there is to check by hand.
    for (const cite of p.querySelectorAll("cite, .exergue")) this.warnings.push(`a <${cite.tagName.toLowerCase()}> to check (a quotation is a <q>): ${cite.textContent!.trim().slice(0, 60)}`)
    // The source's own line breaks and indents are not what was said.
    const text = p.innerHTML.replace(/\s+/g, " ").replace(/ ?<br ?\/?> ?/g, "<br>").trim()
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
      if (child.tagName !== "P") {
        this.warnings.push(`a <${child.tagName.toLowerCase()}> in the dialogue, put before it`)
        continue
      }
      const { name, text } = this.saidOf(child)
      // Who speaks: the paragraph's class, or the name it starts with when the page writes it that way.
      const kind = prefixes
        ? (name === prefixes[0] ? "question" : name === prefixes[1] ? "answer" : undefined)
        : child.classList.contains("question") ? "question" : child.classList.contains("answer") ? "answer" : undefined
      if (!kind) this.warnings.push(`a paragraph that is neither question nor answer, given to the previous speaker: ${child.textContent!.trim().slice(0, 60)}`)
      let id: string
      if (kind && name && !prefixes) named[kind] = name
      const said = kind ? named[kind] : undefined
      if (said) {
        id = InterviewMigration.peopleId(said)
        speakers[id] ??= { role: defaults[kind!].speaker.role, title: said }
      } else if (kind) {
        id = defaults[kind].id
        speakers[id] ??= defaults[kind].speaker
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
      .filter(quote => quote.querySelector("p.question, p.answer")).map(quote => [...quote.children])
    if (dialogues.length === 0) throw new Error(`${this.page}: no dialogue`)
    const dir = path.dirname(this.page)
    const base = path.basename(this.page, ".html").replace(/^index/, "")
    const names = dialogues.map((_, index) => `interview${base}${dialogues.length > 1 ? `-${index + 1}` : ""}.json`)
    const interviews = dialogues.map(quote => this.interviewOf(quote, document))
    let source = fs.readFileSync(this.page, "utf8")
    const quotes = prefixes ? this.prefixedSource(source, prefixes, dialogues.map(run => run.length))
      : [...source.matchAll(/<blockquote[^>]*>[\s\S]*?<\/blockquote>/g)].filter(match => InterviewMigration.DIALOGUE.test(match[0]))
    if (quotes.length !== dialogues.length) throw new Error(`${this.page}: ${quotes.length} dialogues in the source, ${dialogues.length} in the generated page`)
    for (const [index, match] of [...quotes.entries()].reverse()) {
      const figures = [...match[0].matchAll(/<figure[\s\S]*?<\/figure>/g)].map(figure => figure[0] + "\n")
      const element = `${figures.join("")}<rr0-interview src="${names[index]}"></rr0-interview>`
      source = source.slice(0, match.index) + element + source.slice(match.index! + match[0].length)
    }
    if (!source.includes(InterviewMigration.SCRIPT)) source = source.replace(/(<rr0-interview )/, `${InterviewMigration.SCRIPT}\n$1`)
    interviews.forEach((interview, index) => {
      const segments = interview.segments as Segment[]
      console.log(`${path.join(dir, names[index])}: ${segments.length} turns, speakers ${Object.keys(interview.speakers as object).join(", ")}`)
    })
    for (const warning of new Set(this.warnings)) console.warn(`  ! ${warning}`)
    if (this.options.preview) {
      fs.mkdirSync(this.options.preview, { recursive: true })
      interviews.forEach((interview, index) => fs.writeFileSync(path.join(this.options.preview!, names[index]), JSON.stringify(interview, null, 2) + "\n"))
    }
    if (!this.options.apply) return
    interviews.forEach((interview, index) => fs.writeFileSync(path.join(dir, names[index]), JSON.stringify(interview, null, 2) + "\n"))
    fs.writeFileSync(this.page, source)
  }

  static main(args: string[]): void {
    const value = (flag: string): string | undefined => {
      const at = args.indexOf(flag)
      return at < 0 ? undefined : args[at + 1]
    }
    const pages = args.filter((arg, index) => !arg.startsWith("--") && !["--interviewer", "--interviewee", "--preview", "--prefixes"].includes(args[index - 1]))
    const prefixes = value("--prefixes")?.split(",") as [string, string] | undefined
    for (const page of pages) {
      new InterviewMigration(page, { apply: args.includes("--apply"), interviewer: value("--interviewer"), interviewee: value("--interviewee"), preview: value("--preview"), prefixes }).run()
    }
  }
}

InterviewMigration.main(process.argv.slice(2))
