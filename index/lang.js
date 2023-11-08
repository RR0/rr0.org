import {Filterform} from "./index.js"

const speechLabel = "🔈"
let speechMsg = undefined
const transformed = "transformed"

const addSpeech = (e, lang = e.lang, text = e.textContent) => {
  console.log("adding", e, "with lang", lang, "and text", text)
  if (!e.classList.contains(transformed)) {
    e.classList.add(transformed)
    const speechEl = document.createElement("button")
    speechEl.className = "speech"
    speechEl.textContent = speechLabel
    const voices = speechSynthesis.getVoices()
    speechEl.title = "Ecouter en " + langs[e.lang].label
    speechEl.onclick = () => {
      const anotherSpeech = speechMsg && speechMsg.text !== text
      if (!speechMsg || anotherSpeech) {
        if (anotherSpeech) {
          speechSynthesis.cancel()
        }
        speechMsg = new SpeechSynthesisUtterance()
        speechMsg.voice = voices[2]
        speechMsg.lang = lang
        speechMsg.text = text
        speechMsg.onend = (e) => {
          speechEl.textContent = speechLabel
        }
        speechMsg.onerror = (e) => {
          console.error(e)
          speechEl.textContent = speechLabel
        }
      }
      if (speechSynthesis.paused) {
        speechSynthesis.resume()
        speechEl.textContent = "🔇"
      } else if (speechSynthesis.speaking) {
        speechSynthesis.pause()
        speechEl.textContent = speechLabel
      } else {
        console.log("playing", speechMsg)
        speechSynthesis.speak(speechMsg)
        speechEl.textContent = "🔇"
      }
    }
    e.append(speechEl)
    console.log("added", speechEl, "to", e)
    e.classList.add(transformed)
  }
  return e
}

const langs = {
  "fr": {
    label: "Français",
    transform: addSpeech
  },
  "fro": {
    label: "Français ancien",
    transform: addSpeech
  },
  "ar": {
    label: "Arabe",
    transform: addSpeech
  },
  "ar-Latn": {
    label: "Arabe phonétique",
    transform: (e) => {
      if (!e.classList.contains(transformed)) {
        e.innerHTML = e.innerHTML.replaceAll(/(dh|sh|gh|kh|th|hţ)/gi, `<u>$1</u>`)
        const arEl = e.parentElement.querySelector("[lang='ar']")
        const text = arEl.textContent.substring(0, arEl.textContent.indexOf(speechLabel))
        addSpeech(e, "ar", text)
      }
      return e
    }
  },
  "he": {
    label: "Hébreu",
    transform: addSpeech
  },
  "he-Latn": {
    label: "Hébreu phonétique",
    transform: (e) => {
      const heEl = e.parentElement.querySelector("[lang='he']")
      const text = heEl.textContent.substring(0, heEl.textContent.indexOf(speechLabel))
      addSpeech(e, "he", text)
    }
  },
  "img": {
    label: "Image"
  }
}

new Filterform("#lang-form", value => value ? `*[lang="${value}"]` : "*[lang]", ["fr"], langs, p => p.lang)
