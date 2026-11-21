import { tagsMessages_fr } from "./messages/TagsMessages_fr.mjs"
import { loadTagsMessages } from "./messages/index.mjs"

const template = document.createElement("template")
const html = `
<button id="toggle" type="button" part="toggle"></button>
<ul id="list" role="group"></ul>
`
const style = `
:host {
  display: none;
}
:host(.has-tags) {
  display: block;
}
#toggle {
  font: inherit;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
}
#list {
  display: none;
  position: absolute;
  z-index: 1;
  margin: 0;
  padding: .3em;
  min-width: 8em;
  list-style: none;
  white-space: nowrap;
  background: rgba(242, 242, 248, .98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
}
:host(:hover) #list, :host(:focus-within) #list {
  display: block;
}
#list li {
  padding: 0;
}
#list button {
  font: inherit;
  cursor: pointer;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: .2em .4em;
  color: inherit;
}
#list button:hover {
  background: rgba(11, 117, 178, .15);
}
#list button[aria-pressed="false"] {
  opacity: .5;
  text-decoration: line-through;
}
@media (prefers-color-scheme: dark) {
  #list {
    background: rgb(20, 20, 25);
  }
  #list button:hover {
    background: rgba(255, 255, 255, .15);
  }
}
@media (min-width: 60em) {
  #list {
    display: block;
    position: relative;
    box-shadow: none;
    max-height: 75vh;
    overflow: auto;
  }
}
`
template.innerHTML = `<style>${style}</style>${html}`

const STORAGE_KEY = "rr0-tags-disabled"
const CONTENT_TAG_SELECTOR = ".contents [class*='tag-']"
const PLACEHOLDER_CLASS = "tags-filtered"

/**
 * Lets readers filter page content by tag: every element under `.contents` carrying one or more
 * `tag-<slug>` classes (slugs are English, like the rest of the codebase) can be hidden/shown by
 * clicking the matching tag button, and previewed by hovering it. The disabled-tags selection is
 * shared across pages via localStorage. Labels are localized (see messages/), falling back to an
 * auto-humanized slug for tags not in the dictionary.
 */
export class TagsComponent extends HTMLElement {
  static NAME = "rr0-tags"

  #disabled
  #messages = tagsMessages_fr
  #buttons = new Map()

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.appendChild(template.content.cloneNode(true))
    this.#disabled = TagsComponent.#loadDisabled()
  }

  /**
   * Content tag slugs of `el`, i.e. its `tag-<slug>` classes with the prefix stripped. Excludes
   * `hidden`/`previewed`, the two bookkeeping classes this component itself toggles on content
   * elements — they must never be mistaken for a content tag.
   */
  static #tagsOf(el) {
    return Array.from(el.classList)
      .filter(className => className.startsWith("tag-"))
      .map(className => className.substring("tag-".length))
  }

  static #humanize(tag) {
    return tag.replace(/-/g, " ").replace(/^./, c => c.toUpperCase())
  }

  static #loadDisabled() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch {
      return new Set()
    }
  }

  static #saveDisabled(disabled) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(disabled)))
    } catch {
      // Storage unavailable (private mode, quota): selection just won't persist.
    }
  }

  connectedCallback() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.#init())
    } else {
      this.#init()
    }
  }

  #init() {
    const tags = this.#findTags()
    if (tags.length === 0) {
      return
    }
    this.classList.add("has-tags")
    const list = this.shadow.getElementById("list")
    for (const tag of tags) {
      const li = document.createElement("li")
      const button = document.createElement("button")
      button.type = "button"
      button.dataset.tag = tag
      button.setAttribute("aria-pressed", String(!this.#disabled.has(tag)))
      button.onclick = () => this.#toggleTag(tag, button)
      button.onmouseenter = () => this.#setPreview(tag, true)
      button.onmouseleave = () => this.#setPreview(tag, false)
      li.appendChild(button)
      list.appendChild(li)
      this.#buttons.set(tag, button)
    }
    this.#applyLabels()
    this.#applyVisibility()
    loadTagsMessages(navigator.languages).then(messages => {
      this.#messages = messages
      this.#applyLabels()
      this.#applyVisibility()
    })
  }

  #applyLabels() {
    this.shadow.getElementById("toggle").textContent = this.#messages.toggle
    for (const [tag, button] of this.#buttons) {
      button.textContent = this.#messages.tags[tag] ?? TagsComponent.#humanize(tag)
    }
  }

  #toggleTag(tag, button) {
    if (this.#disabled.has(tag)) {
      this.#disabled.delete(tag)
    } else {
      this.#disabled.add(tag)
    }
    button.setAttribute("aria-pressed", String(!this.#disabled.has(tag)))
    TagsComponent.#saveDisabled(this.#disabled)
    this.#applyVisibility()
  }

  #findTags() {
    const seen = new Set()
    const tags = []
    for (const el of document.querySelectorAll(CONTENT_TAG_SELECTOR)) {
      for (const tag of TagsComponent.#tagsOf(el)) {
        if (!seen.has(tag)) {
          seen.add(tag)
          tags.push(tag)
        }
      }
    }
    return tags
  }

  #applyVisibility() {
    for (const el of document.querySelectorAll(CONTENT_TAG_SELECTOR)) {
      const tags = TagsComponent.#tagsOf(el)
      const hidden = tags.every(tag => this.#disabled.has(tag))
      el.classList.toggle("hidden", hidden)
    }
    this.#applyPlaceholders()
  }

  /**
   * Shows a "filtered content" placeholder where each run of consecutive hidden siblings used to be, so that a
   * section whose content is entirely filtered out doesn't look empty or broken. Its tooltip names the filtered tags,
   * and clicking it reveals that run only, without changing the stored selection.
   */
  #applyPlaceholders() {
    for (const placeholder of document.querySelectorAll(`.contents .${PLACEHOLDER_CLASS}`)) {
      placeholder.remove()
    }
    const isHidden = el => el?.classList.contains("hidden") && TagsComponent.#tagsOf(el).length > 0
    for (const el of document.querySelectorAll(CONTENT_TAG_SELECTOR)) {
      if (!isHidden(el) || isHidden(el.previousElementSibling) || isHidden(el.parentElement?.closest(".hidden"))) {
        continue  // Not hidden, not the start of a run, or already inside a hidden ancestor.
      }
      const run = []
      for (let sibling = el; isHidden(sibling); sibling = sibling.nextElementSibling) {
        run.push(sibling)
      }
      const tags = [...new Set(run.flatMap(hiddenEl => TagsComponent.#tagsOf(hiddenEl)))]
      const labels = tags.map(tag => this.#messages.tags[tag] ?? TagsComponent.#humanize(tag)).join(", ")
      const inList = ["UL", "OL"].includes(el.parentElement?.tagName)
      const placeholder = document.createElement(inList ? "li" : "p")
      placeholder.className = PLACEHOLDER_CLASS
      placeholder.textContent = `${this.#messages.filtered} (${labels})`
      placeholder.title = this.#messages.reveal
      placeholder.onclick = () => {
        run.forEach(hiddenEl => hiddenEl.classList.remove("hidden"))
        placeholder.remove()
      }
      el.before(placeholder)
    }
  }

  #setPreview(tag, previewed) {
    for (const el of document.querySelectorAll(`.contents .tag-${tag}`)) {
      el.classList.toggle("previewed", previewed)
    }
  }
}

const name = TagsComponent.NAME
if (!customElements.get(name)) {
  customElements.define(name, TagsComponent)
}
