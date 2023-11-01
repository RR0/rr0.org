import {Filterform} from "/index/index.js"

const juzLabels = {
  "1": "Juzz 1",
  "2": "Juzz 2"
}
new Filterform("#juzz-form", value => value ? `*[data-juzz="${value}"]` : "*[data-juzz]", ["1"], juzLabels, p => p.dataset.juzz)

const hizbLabels = {
  "1": "Hizb 1",
  "2": "Hizb 2"
}
new Filterform("#hizb-form", value => value ? `*[data-hizb="${value}"]` : "*[data-hizb]", ["1"], hizbLabels, p => p.dataset.hizb)
