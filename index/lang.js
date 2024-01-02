import { Filterform } from './index.js'

const speechLabel = '🔈'
let speechMsg
const transformed = 'transformed'

const addSpeech = (e, lang = e.lang, text = e.textContent) => {
  if (!e.classList.contains(transformed)) {
    e.classList.add(transformed)
    const speechEl = document.createElement('button')
    speechEl.className = 'speech'
    speechEl.textContent = speechLabel
    const voices = speechSynthesis.getVoices().filter(voice => voice.localService === true)
    speechEl.title = 'Écouter en ' + supportedLangs[e.lang].label
    speechEl.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const anotherSpeech = speechMsg && speechMsg.text !== text
      if (!speechMsg || anotherSpeech) {
        if (anotherSpeech) {
          speechSynthesis.cancel()
        }
        speechMsg = new SpeechSynthesisUtterance()
        const variant = navigator.language.substring(navigator.language.indexOf('-'))
        speechMsg.voice = voices.find(voice => voice.lang === lang + variant) || voices.find(voice => voice.lang.startsWith(lang))
        speechMsg.lang = lang
        speechMsg.text = text
        speechMsg.onend = () => {
          speechEl.textContent = speechLabel
        }
        speechMsg.onerror = (e) => {
          console.error(e)
          speechEl.textContent = speechLabel
        }
      }
      if (speechSynthesis.paused) {
        speechSynthesis.resume()
        speechEl.title = 'Mettre en pause'
        speechEl.textContent = '🔇'
      } else if (speechSynthesis.speaking) {
        speechSynthesis.pause()
        speechEl.title = 'Reprendre'
        speechEl.textContent = speechLabel
      } else {
        speechSynthesis.speak(speechMsg)
        speechEl.title = 'Mettre en pause'
        speechEl.textContent = '🔇'
      }
    }
    e.append(speechEl)
    e.classList.add(transformed)
  }
  return e
}

const supportedLangs = {
  'en': {
    label: 'Anglais', transform: addSpeech
  },
  'fr': {
    label: 'Français', transform: addSpeech
  },
  'fro': {
    label: 'Français ancien', transform: addSpeech
  },
  'ar': {
    label: 'Arabe', transform: (e) => {
      e.dir = e.dir || 'rtl'
      addSpeech(e)
      return e
    }
  },
  'ar-Latn': {
    label: 'Arabe phonétique', transform: (e) => {
      if (!e.classList.contains(transformed)) {
        e.innerHTML = e.innerHTML.replaceAll(/(dh|sh|gh|kh|th|hţ)/gi, `<u>$1</u>`)
        const arEl = e.parentElement.querySelector('[lang=\'ar\']')
        if (arEl) {
          const text = arEl.textContent.substring(0, arEl.textContent.indexOf(speechLabel))
          addSpeech(e, 'ar', text)
        }
      }
      return e
    }
  },
  'he': {
    label: 'Hébreu', transform: (e) => {
      e.dir = e.dir || 'rtl'
      addSpeech(e)
      return e
    }
  },
  'he-Latn': {
    label: 'Hébreu phonétique', transform: (e) => {
      const heEl = e.parentElement.querySelector('[lang=\'he\']')
      const text = heEl.textContent.substring(0, heEl.textContent.indexOf(speechLabel))
      addSpeech(e, 'he', text)
    }
  },
  'img': {
    label: 'Image'
  }
}

const userLangs = navigator.languages.map(lang => lang.substring(0, 2))
const supportedLangCodes = Object.keys(supportedLangs)
const langs = userLangs.filter(lang => supportedLangCodes.includes(lang))
const lang = langs.length > 0 ? langs[0] : ['fr']
new Filterform('#lang-form', value => value ? `*[lang="${value}"]` : '*[lang]', lang, supportedLangs, p => p.lang)
