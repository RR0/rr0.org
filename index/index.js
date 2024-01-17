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
   * @member {string}
   */
  #formSelector

  /**
   *
   * @param {string} formSelector
   * @param {function} tagSelector
   * @param {string[]} checkedLangs The array of initially-checked inputs.
   * @param {object} supportedLangs Key-values of languages
   * @param {function} tagAttribute returns the attribute that will provide a possible value to check.
   */
  constructor (formSelector, tagSelector, checkedLangs, supportedLangs, tagAttribute) {
    this.#formSelector = formSelector
    this.#tagSelector = tagSelector
    this.checked = checkedLangs
    this.#langs = supportedLangs
    this.tagAttribute = tagAttribute
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', ready)
    } else {
      this.ready()
    }
  }

  /**
   *
   * @param {string} value
   * @return {HTMLElement[]}
   */
  getTags (value) {
    const selector = this.#tagSelector(value)
    const tags = Array.from(document.querySelectorAll(selector))
      .filter(element => !['HTML', 'I'].includes(element.nodeName))
    const lang = this.#langs[value]
    return lang ? tags.map(tag => {
      const transform = lang.transform
      return transform ? transform(tag) : tag
    }) : tags
  }

  clicked () {
    const inputs = Array.from(document.querySelectorAll(this.#formSelector + ` input[type="checkbox"]`))
    for (const input of inputs) {
      const tags = this.getTags(input.value)
      for (let i = 0; i < tags.length; i++) {
        const item = tags[i]
        item.classList.toggle('visible', input.checked)
        item.classList.toggle('hidden', !input.checked)
        this.hint(input, input.checked ? 'Cliquez pour masquer' : 'Cliquez pour afficher')
        const id = item.getAttribute('id')
        if (id) {
          item.setAttribute('value', id)
        }
      }
    }
    const checkedOnes = inputs.filter(input => input.checked)
    if (checkedOnes.length <= 1) {
      checkedOnes.forEach(checkedOne => {
        checkedOne.disabled = true
        const list = document.querySelector('ol.indexed')
        let listStyleType
        let dir
        switch (checkedOne.value) {
          case 'he':
            listStyleType = 'hebrew'
            dir = 'rtl'
            break
          case 'ar':
            listStyleType = 'arabic-indic'
            dir = 'rtl'
            break
          default:
            listStyleType = null
            dir = null
        }
        list.style['list-style-type'] = listStyleType
        list.setAttribute('dir', dir)
        this.hint(checkedOne, inputs.length > 1 ? 'Sélectionnez un autre choix avant de déselectionner celui-ci' : 'Seul choix disponible')
      })
    } else {
      checkedOnes.forEach(checkedOne => {
        checkedOne.disabled = false
      })
    }
  }

  hint (input, hint) {
    const labeled = input.parentElement.nodeName === 'LABEL' ? input.parentElement : input
    labeled.title = hint
  }

  ready () {
    const ps = this.getTags()
    const values = ps.reduce((ls, p) => {
      ls.add(this.tagAttribute(p))
      return ls
    }, new Set())
    const form = document.querySelector(this.#formSelector)
    for (const value of values) {
      const label = document.createElement('label')
      const input = document.createElement('input')
      input.type = 'checkbox'
      input.value = value
      input.onclick = this.clicked.bind(this)
      if (this.checked.includes(value)) {
        input.checked = true
      }
      label.appendChild(input)
      label.append(' ' + this.#langs[value].label)
      form.append(label)
    }
    this.clicked()
  }
}
