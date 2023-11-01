export class Filterform {

  constructor(formSelector, tagSelector, checked, labels, tagAttribute) {
    this.formSelector = formSelector
    this.tagSelector = tagSelector
    this.checked = checked
    this.labels = labels
    this.tagAttribute = tagAttribute
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", ready)
    } else {
      this.ready()
    }
  }

  getTags(value) {
    const selector = this.tagSelector(value)
    const tags = Array.from(document.querySelectorAll(selector))
    return tags.filter(element => !["HTML", "I"].includes(element.nodeName))
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
      label.append(" " + this.labels[value])
      form.append(label)
    }
    this.clicked()
  }
}
