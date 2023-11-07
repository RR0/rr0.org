export class Filterform {
  /**
   * @member {function}
   */
  #tagSelector

  /**
   * @member {object}
   */
  #langs

  /**
   *
   * @param {string} formSelector
   * @param {function} tagSelector
   * @param {string[]} checked The array of initially-checked inputs.
   * @param {object} langs Key-values of languages
   * @param {function} tagAttribute returns the attribute that will provide a possible value to check.
   */
  constructor(formSelector, tagSelector, checked, langs, tagAttribute) {
    this.formSelector = formSelector
    this.#tagSelector = tagSelector
    this.checked = checked
    this.#langs = langs
    this.tagAttribute = tagAttribute
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", ready)
    } else {
      this.ready()
    }
  }

  /**
   *
   * @param {string} value
   * @return {HTMLElement[]}
   */
  getTags(value) {
    const selector = this.#tagSelector(value)
    const tags = Array.from(document.querySelectorAll(selector))
    const lang = this.#langs[value]
    const transformed = lang ? tags.map(tag => {
      const transform = lang.transform
      return transform ? transform(tag) : tag
    }) : tags
    return transformed.filter(element => !["HTML", "I"].includes(element.nodeName))
  }

  clicked() {
    const inputs = document.querySelectorAll(`form input[type="checkbox"]`)
    for (const input of inputs) {
      const paragraphs = this.getTags(input.value)
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i]
        paragraph.style.display = input.checked ? paragraph.nodeName === "LI" ? "list-item" : "block" : "none"
        paragraph.setAttribute("value", paragraph.getAttribute("id"))
      }
    }
  }

  ready() {
    const ps = this.getTags()
    const values = ps.reduce((ls, p) => {
      ls.add(this.tagAttribute(p))
      return ls
    }, new Set())
    const form = document.querySelector(this.formSelector)
    for (const value of values) {
      const label = document.createElement("label")
      const input = document.createElement("input")
      input.type = "checkbox"
      input.value = value
      input.onclick = this.clicked.bind(this)
      if (this.checked.includes(value)) {
        input.checked = true
      }
      label.appendChild(input)
      label.append(" " + this.#langs[value].label)
      form.append(label)
    }
    this.clicked()
  }
}
