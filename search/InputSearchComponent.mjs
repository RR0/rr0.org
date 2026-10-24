const template = document.createElement("template")
template.innerHTML = `
<style>
  :host {
    display: inline-block;
    position: relative;
  }
  input {
    width: 100%;
    box-sizing: border-box;
  }
  ul {
    /* A popover lives in the top layer and is placed from the input's rect (see #place): neither a clipping,
       overflowing ancestor (the nav, the sticky header) nor its width can hide or squeeze it. */
    position: fixed;
    inset: auto;
    box-sizing: border-box;
    width: max-content;
    overflow-y: auto;
    overscroll-behavior: contain;
    margin: 2px 0 0;
    padding: 0;
    list-style: none;
    background: Canvas;
    color: CanvasText;
    border: 1px solid GrayText;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .25);
    font-size: 1rem;
    line-height: 1.3;
    text-align: left;
  }
  ul[hidden] {
    display: none;
  }
  li {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: .75em;
    padding: .6em .75em; /* >= 44px tall on touch screens with the line height */
    cursor: pointer;
  }
  .label {
    overflow-wrap: anywhere;
  }
  .kind {
    flex: none;
    padding: 0 .5em;
    border: 1px solid currentColor;
    border-radius: 1em;
    font-size: .75em;
    opacity: .75;
    white-space: nowrap;
  }
  li[aria-selected="true"] {
    background: Highlight;
    color: HighlightText;
  }
  mark {
    background: none;
    color: inherit;
    font-weight: bold;
    text-decoration: underline;
  }
  .status {
    padding: .6em .75em;
    color: GrayText;
    cursor: default;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
<input id="input" type="search" part="input" role="combobox" aria-autocomplete="list" aria-expanded="false"
       aria-controls="list" aria-haspopup="listbox" autocomplete="off" autocapitalize="off" autocorrect="off"
       spellcheck="false" enterkeyhint="go">
<ul id="list" role="listbox" part="list" popover="manual" hidden></ul>
<div id="live" class="sr-only" role="status" aria-live="polite"></div>`

/**
 * A search box for the site's pages: type some text and pick a page from the list that shows below.
 *
 * Matching ignores case and diacritics, and every word typed must match the start of a word (or, failing that, any part)
 * of an entry, in any order: "Je Be", "jerome" or "bea" all propose "Jérôme Beau".
 *
 * Follows the ARIA 1.2 combobox pattern: ↓/↑ move through the options, Enter opens the active one (or the first),
 * Escape closes the list then clears the field. Options are plain taps/clicks, so it works with touch too.
 *
 * Fires a cancelable "rr0-search-select" event (detail: {label, url}) before navigating to the page.
 */
export class InputSearchComponent extends HTMLElement {
  /**
   * @readonly
   * @type {string}
   */
  static NAME = "rr0-input-search"

  static #maxResultCount = 12

  /**
   * What a page is, from where it lives on the site, the first matching rule winning. A page's own `type` in the index
   * (when the index states one) takes precedence.
   *
   * @type {[RegExp, string][]}
   */
  static kinds = [
    [/^people\//, "Personne"],
    [/^org\//, "Organisation"],
    [/^place\//, "Lieu"],
    [/^science\/crypto\/ufo\/enquete\/dossier\//, "Dossier OVNI"],
    [/^science\/crypto\/zoo\/enquete\/dossier\//, "Dossier cryptozoologie"],
    [/^science\/crypto\/archeo\/enquete\/dossier\//, "Dossier archéologie"],
    [/^croyance\/conspirationnisme\/enquete\/dossier\//, "Dossier complotisme"],
    [/^croyance\/divin\/theisme\/mono\/livre\//, "Texte sacré"],
    [/^science\/crypto\/ufo\//, "OVNI"],
    [/^science\/crypto\/zoo\//, "Cryptozoologie"],
    [/^science\/crypto\/archeo\//, "Archéologie"],
    [/^science\/para\//, "Paranormal"],
    [/^science\//, "Science"],
    [/^tech\//, "Technique"],
    [/^croyance\//, "Croyance"],
    [/^politique\//, "Politique"],
    [/^lang\//, "Langue"],
    [/^time\/(-?\d+\/)+index(_\w+)?\.html$/, "Date"],
    [/^time\//, "Document"]
  ]

  /**
   * @param {string} url
   * @returns {string}
   */
  static kindOf(url) {
    return InputSearchComponent.kinds.find(([pattern]) => pattern.test(url))?.[1] ?? ""
  }

  /**
   * @typedef {{label: string, url: string, norm: string, words: string[], kind: string}} Entry
   * @type {Entry[]}
   */
  #entries = []

  #loading = false

  /** @type {Entry[]} */
  #results = []

  #active = -1

  /**
   * Whether the list has been pressed since it opened: iOS Safari blurs the input on a tap whatever pointerdown does,
   * and closing then would remove the option before its click lands.
   */
  #pressed = false

  /** @type {HTMLInputElement} */
  #input

  /** @type {HTMLUListElement} */
  #list

  /** @type {HTMLElement} */
  #live

  constructor() {
    super()
    const shadow = this.attachShadow({mode: "open"})
    shadow.appendChild(template.content.cloneNode(true))
    this.#input = shadow.getElementById("input")
    this.#list = shadow.getElementById("list")
    this.#live = shadow.getElementById("live")
  }

  static get observedAttributes() {
    return ["placeholder", "src"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "placeholder") {
      this.#input.placeholder = newValue ?? ""
      this.#input.setAttribute("aria-label", newValue ?? "Recherche")
    }
  }

  connectedCallback() {
    if (!this.hasAttribute("placeholder")) {
      this.setAttribute("placeholder", "Recherche")
    }
    // Touch devices have no hover: focus is the common trigger, hover merely anticipates it.
    this.addEventListener("pointerenter", () => this.#load(), {once: true})
    this.#input.addEventListener("focus", () => this.#load())
    this.#input.addEventListener("input", () => this.#update())
    this.#input.addEventListener("keydown", e => this.#keydown(e))
    this.#input.addEventListener("focus", () => this.#update())
    // Keep the input focused while tapping an option, so that the list doesn't close before the click lands.
    this.#list.addEventListener("pointerdown", e => {
      e.preventDefault()
      this.#pressed = true
    })
    this.#list.addEventListener("click", e => {
      const option = e.target.closest("li[data-index]")
      if (option) {
        this.#choose(this.#results[+option.dataset.index])
      }
    })
    this.#list.addEventListener("pointermove", e => {
      const option = e.target.closest("li[data-index]")
      if (option && +option.dataset.index !== this.#active) {
        this.#setActive(+option.dataset.index, false)
      }
    })
    this.#input.addEventListener("blur", () => {
      if (!this.#pressed) {
        this.#close()
      }
    })
  }

  /**
   * Lowercase, without diacritics, with punctuation turned into spaces.
   *
   * @param {string} text
   * @returns {string}
   */
  static normalize(text) {
    return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae")
      .replace(/[^\p{L}\p{N}]+/gu, " ").trim()
  }

  /**
   * @param {string} query
   * @param {Entry[]} entries
   * @returns {Entry[]} The best distinct pages matching the query.
   */
  static search(query, entries) {
    const tokens = InputSearchComponent.normalize(query).split(" ").filter(Boolean)
    if (!tokens.length) {
      return []
    }
    const scored = []
    for (const entry of entries) {
      let score = 0
      for (const token of tokens) {
        if (entry.words.some(word => word === token)) {
          score += 3
        } else if (entry.words.some(word => word.startsWith(token))) {
          score += 2
        } else if (entry.norm.includes(token)) {
          score += 1
        } else {
          score = -1
          break
        }
      }
      if (score > 0) {
        const joined = tokens.join(" ")
        if (entry.norm === joined) {
          score += 10
        } else if (entry.norm.startsWith(joined)) {
          score += 5
        }
        scored.push({entry, score})
      }
    }
    if (!scored.length) {
      InputSearchComponent.#fuzzy(tokens, entries, scored)
    }
    scored.sort((a, b) => b.score - a.score || a.entry.norm.length - b.entry.norm.length)
    const results = []
    const urls = new Set()
    for (const {entry} of scored) {
      if (!urls.has(entry.url)) {
        urls.add(entry.url)
        results.push(entry)
        if (results.length >= InputSearchComponent.#maxResultCount) {
          break
        }
      }
    }
    return results
  }

  /**
   * Typo-tolerant fallback, used only when nothing matches exactly: every word typed may be misspelled by an edit or
   * two (more for longer words) with respect to the start of a word of the entry, "jerme" finding "jerome".
   *
   * @param {string[]} tokens
   * @param {Entry[]} entries
   * @param {{entry: Entry, score: number}[]} scored Where to add the matches, the closest ones with the highest score.
   */
  static #fuzzy(tokens, entries, scored) {
    const maxEdits = token => token.length < 3 ? 0 : token.length < 8 ? 1 : 2
    for (const entry of entries) {
      let total = 0
      for (const token of tokens) {
        const max = maxEdits(token)
        let best = Infinity
        for (const word of entry.words) {
          for (let len = token.length - max; len <= token.length + max && best > 0; len++) {
            if (len > 0) {
              best = Math.min(best, InputSearchComponent.#distance(token, word.slice(0, len)))
            }
          }
        }
        if (best > max) {
          total = -1
          break
        }
        total += best
      }
      if (total >= 0) {
        scored.push({entry, score: 1 / (1 + total)})
      }
    }
  }

  /**
   * Edit distance (insertion, deletion, substitution, transposition of adjacent letters).
   *
   * @param {string} a
   * @param {string} b
   * @returns {number}
   */
  static #distance(a, b) {
    const rows = [new Array(b.length + 1).fill(0), new Array(b.length + 1).fill(0), new Array(b.length + 1).fill(0)]
    for (let j = 0; j <= b.length; j++) {
      rows[1][j] = j
    }
    let prev2 = rows[0], prev = rows[1], cur = rows[2]
    for (let i = 1; i <= a.length; i++) {
      cur[0] = i
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          cur[j] = Math.min(cur[j], prev2[j - 2] + 1)
        }
      }
      ;[prev2, prev, cur] = [prev, cur, prev2]
    }
    return prev[b.length]
  }

  #load() {
    if (this.#entries.length || this.#loading) {
      return
    }
    this.#loading = true
    fetch(this.getAttribute("src") || "/search/index.json").then(async response => {
      if (response.ok) {
        const index = await response.json()
        const entries = []
        const add = (label, url, type) => {
          const norm = InputSearchComponent.normalize(label)
          if (norm) {
            entries.push({label, url, norm, words: norm.split(" "), kind: type || InputSearchComponent.kindOf(url)})
          }
        }
        for (const page of index.pages) {
          const time = page.time
          const title = page.title
          add(title + (time && time !== title.toLowerCase() ? ` (${time})` : ""), page.url, page.type)
          for (const name of page.names || []) {
            add(name, page.url, page.type)
          }
        }
        this.#entries = entries
        if (this.#input.value) {
          this.#update()
        }
      }
    }).catch(() => {}).finally(() => this.#loading = false)
  }

  #update() {
    const query = this.#input.value
    this.#results = InputSearchComponent.search(query, this.#entries)
    this.#active = -1
    this.#input.removeAttribute("aria-activedescendant")
    this.#list.replaceChildren()
    if (!InputSearchComponent.normalize(query)) {
      this.#close()
      return
    }
    const tokens = InputSearchComponent.normalize(query).split(" ")
    if (this.#results.length) {
      this.#results.forEach((entry, i) => {
        const li = document.createElement("li")
        li.id = "opt" + i
        li.setAttribute("role", "option")
        li.setAttribute("aria-selected", "false")
        li.dataset.index = String(i)
        const label = document.createElement("span")
        label.className = "label"
        this.#renderLabel(label, entry.label, tokens)
        li.append(label)
        if (entry.kind) {
          const kind = document.createElement("span")
          kind.className = "kind"
          kind.textContent = entry.kind
          li.append(kind)
        }
        this.#list.append(li)
      })
      this.#live.textContent = this.#results.length === 1 ? "1 résultat" : `${this.#results.length} résultats`
    } else {
      const li = document.createElement("li")
      li.className = "status"
      li.setAttribute("role", "presentation")
      li.textContent = this.#entries.length ? "Aucun résultat" : "Chargement…"
      this.#list.append(li)
      this.#live.textContent = li.textContent
    }
    this.#open()
  }

  /**
   * Shows a label with the parts that match the typed words in bold.
   *
   * @param {HTMLElement} parent
   * @param {string} label
   * @param {string[]} tokens
   */
  #renderLabel(parent, label, tokens) {
    // Normalizing may change lengths (ligatures, decomposed accents), so only highlight char-for-char identical forms.
    const plain = label.normalize("NFC")
    const flat = Array.from(plain, c => c.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase())
    if (flat.some(c => c.length !== 1)) {
      parent.textContent = label
      return
    }
    const folded = flat.join("")
    const marked = new Array(plain.length).fill(false)
    for (const token of tokens) {
      let from = 0
      for (let at; (at = folded.indexOf(token, from)) >= 0; from = at + token.length) {
        marked.fill(true, at, at + token.length)
        break
      }
    }
    let i = 0
    while (i < plain.length) {
      let j = i
      while (j < plain.length && marked[j] === marked[i]) {
        j++
      }
      const chunk = plain.slice(i, j)
      if (marked[i]) {
        const mark = document.createElement("mark")
        mark.textContent = chunk
        parent.append(mark)
      } else {
        parent.append(chunk)
      }
      i = j
    }
  }

  #open() {
    this.#list.hidden = false
    if (!this.#list.matches(":popover-open")) {
      this.#list.showPopover?.()
    }
    this.#place()
    this.#input.setAttribute("aria-expanded", "true")
    addEventListener("resize", this.#onViewport)
    addEventListener("scroll", this.#onViewport, true)
    document.addEventListener("pointerdown", this.#onOutside, true)
  }

  #onViewport = () => this.#place()

  /** Closes the list when tapping elsewhere, as the input may have lost its focus without closing it. */
  #onOutside = e => {
    if (!e.composedPath().includes(this)) {
      this.#close()
    }
  }

  /** Puts the list right under the input, within the viewport. */
  #place() {
    const rect = this.#input.getBoundingClientRect()
    const margin = 8
    const width = Math.min(Math.max(rect.width, 20 * 16), innerWidth - 2 * margin)
    const list = this.#list.style
    list.minWidth = rect.width + "px"
    list.maxWidth = width + "px"
    list.left = Math.max(margin, Math.min(rect.left, innerWidth - width - margin)) + "px"
    list.top = rect.bottom + 2 + "px"
    list.maxHeight = Math.max(120, Math.min(24 * 16, innerHeight - rect.bottom - margin - 2)) + "px"
  }

  #close() {
    this.#list.hidden = true
    if (this.#list.matches(":popover-open")) {
      this.#list.hidePopover?.()
    }
    removeEventListener("resize", this.#onViewport)
    removeEventListener("scroll", this.#onViewport, true)
    document.removeEventListener("pointerdown", this.#onOutside, true)
    this.#pressed = false
    this.#active = -1
    this.#input.setAttribute("aria-expanded", "false")
    this.#input.removeAttribute("aria-activedescendant")
  }

  /**
   * @param {number} index
   * @param {boolean} scroll Whether to bring the option into view (keyboard) or not (pointer).
   */
  #setActive(index, scroll = true) {
    const options = this.#list.querySelectorAll("li[role=option]")
    options[this.#active]?.setAttribute("aria-selected", "false")
    this.#active = index
    const option = options[index]
    if (option) {
      option.setAttribute("aria-selected", "true")
      this.#input.setAttribute("aria-activedescendant", option.id)
      if (scroll) {
        option.scrollIntoView({block: "nearest"})
      }
    } else {
      this.#input.removeAttribute("aria-activedescendant")
    }
  }

  #keydown(e) {
    const count = this.#results.length
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (this.#list.hidden) {
          this.#update()
        } else if (count) {
          this.#setActive((this.#active + 1) % count)
        }
        break
      case "ArrowUp":
        e.preventDefault()
        if (count && !this.#list.hidden) {
          this.#setActive((this.#active - 1 + count) % count)
        }
        break
      case "Enter": {
        const entry = this.#results[this.#active >= 0 ? this.#active : 0]
        if (entry && !this.#list.hidden && !e.isComposing) {
          e.preventDefault()
          this.#choose(entry)
        }
        break
      }
      case "Escape":
        if (!this.#list.hidden) {
          e.preventDefault()
          this.#close()
        } else if (this.#input.value) {
          e.preventDefault()
          this.#input.value = ""
        }
        break
      case "Tab":
        this.#close()
        break
    }
  }

  /**
   * @param {Entry} entry
   */
  #choose(entry) {
    const event = new CustomEvent("rr0-search-select", {
      bubbles: true, composed: true, cancelable: true, detail: {label: entry.label, url: entry.url}
    })
    this.#close()
    if (this.dispatchEvent(event)) {
      window.location.href = "/" + entry.url
    }
  }
}

const name = InputSearchComponent.NAME
if (!customElements.get(name)) {
  customElements.define(name, InputSearchComponent)
}
