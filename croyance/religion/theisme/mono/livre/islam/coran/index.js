import {Filterform} from "/index/index.js"

const juzIndexes = [...Array(30)].map((arr, i) => i + 1).map(n => String(n))
const juzLabels = juzIndexes.reduce((obj, n) => {
  obj[n] = {label: "Juzz " + n}
  return obj
}, {})
new Filterform("#juzz-form", value => value ? `*[data-juzz="${value}"]` : "*[data-juzz]", juzIndexes, juzLabels, p => p.dataset.juzz)

const hizbIndexes = [...Array(60)].map((arr, i) => i + 1).map(n => String(n))
const hizbLabels = hizbIndexes.reduce((obj, n) => {
  obj[String(n)] = {label: "Hibz " + n}
  return obj
}, {})
new Filterform("#hizb-form", value => value ? `*[data-hizb="${value}"]` : "*[data-hizb]", hizbIndexes, hizbLabels, p => p.dataset.hizb)
