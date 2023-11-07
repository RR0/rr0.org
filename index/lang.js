import {Filterform} from "./index.js"

const langs = {
  "fr": {
    label: "Français"
  },
  "fro": {
    label: "Français ancien"
  },
  "ar": {
    label: "Arabe"
  },
  "ar-Latn": {
    label: "Arabe phonétique",
    transform: (e) => {
      e.innerHTML = e.innerHTML.replaceAll(/(dh|sh|gh|kh|th|hţ)/gi, `<u>$1</u>`)
      return e
    }
  },
  "he": {
    label: "Hébreu"
  },
  "he-Latn": {
    label: "Hébreu phonétique"
  },
  "img": {
    label: "Image"
  }
}
new Filterform("#lang-form", value => value ? `*[lang="${value}"]` : "*[lang]", ["fr"], langs, p => p.lang)
