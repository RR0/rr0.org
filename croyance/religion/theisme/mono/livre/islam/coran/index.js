import {Filterform} from "/index/index.js"

const juzLabels = [...Array(30)].map((arr, i) => i + 1).reduce((obj, n) => {
  obj[String(n)] = "Juzz " + n
  return obj
}, {})
new Filterform("#juzz-form", value => value ? `*[data-juzz="${value}"]` : "*[data-juzz]", ["1"], juzLabels, p => p.dataset.juzz)

const hizbLabels = [...Array(60)].map((arr, i) => i + 1).reduce((obj, n) => {
  obj[String(n)] = "Hibz " + n
  return obj
}, {})
new Filterform("#hizb-form", value => value ? `*[data-hizb="${value}"]` : "*[data-hizb]", ["1"], hizbLabels, p => p.dataset.hizb)
