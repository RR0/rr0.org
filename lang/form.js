import { Filterform } from '/index/index.js'
import { supportedLangs } from './speech.js'

/**
 * @typedef SupportedLang
 * @property {string} label
 * @property {function(HTMLElement, string): HTMLElement} transform
 */

const userLangs = navigator.languages.map(lang => lang.substring(0, 2))
const supportedLangCodes = Object.keys(supportedLangs)
const langs = userLangs.filter(lang => supportedLangCodes.includes(lang))
const checkedLangs = langs.length > 0 ? langs[0] : ['fr']
const tagSelector = value => value ? `*[lang="${value}"]` : '*[lang]'
new Filterform('#lang-form', tagSelector, checkedLangs, supportedLangs, p => p.lang)
