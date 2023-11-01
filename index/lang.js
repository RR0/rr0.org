import {Filterform} from "./index.js"

const langLabels = {
  "fr": "Français",
  "fro": "Français ancien",
  "ar": "Arabe",
  "ar-Latn": "Arabe phonétique",
  "he": "Hébreu",
  "he-Latn": "Hébreu phonétique",
  "img": "Image"
}
new Filterform("#lang-form", value => value ? `*[lang="${value}"]` : "*[lang]", ["fr"], langLabels, p => p.lang)
