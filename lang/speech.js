const speechLabel = '🔈'
let speechMsg
export const transformed = 'transformed'

/**
 * @param {HTMLElement} el
 * @return {string}
 */
export function getText (el) {
  const nodes = Array.from(el.childNodes)
  return nodes
    .map(node => {
      switch (node.nodeType) {
        case 3:
          return node.nodeValue
        default:
          return node.hasChildNodes() ? node.childNodes[0].nodeValue : node.nodeValue
      }
    }).join('')
}

export const addSpeech = (e, lang = e.lang, text = getText(e)) => {
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

/**
 *
 * @type {{'he-Latn': SupportedLang, ar: SupportedLang, fro: SupportedLang, img: SupportedLang, en: SupportedLang, it: SupportedLang, fr: SupportedLang, he: SupportedLang}}
 */
export const supportedLangs = {
  'ar': {
    label: 'Arabe',
    transform: (e) => {
      e.dir = e.dir || 'rtl'
      addSpeech(e)
      return e
    }
  },
  'ar-Latn': {
    label: 'Arabe phonétique',
    transform: (e) => {
      if (!e.classList.contains(transformed)) {
        e.innerHTML = e.innerHTML.replaceAll(/(dh|sh|gh|kh|th|hţ)/gi, `<u>$1</u>`)
        const arEl = e.parentElement.querySelector('[lang=\'ar\']')
        if (arEl) {
          const text = getText(arEl)
          addSpeech(e, 'ar', text.substring(0, text.indexOf(speechLabel)))
        }
      }
      return e
    }
  },
  'en': {
    label: 'Anglais', transform: addSpeech
  },
  'fr': {
    label: 'Français', transform: addSpeech
  },
  'fro': {
    label: 'Français ancien', transform: addSpeech
  },
  'he': {
    label: 'Hébreu',
    transform: (e) => {
      e.dir = e.dir || 'rtl'
      addSpeech(e)
      return e
    }
  },
  'he-Latn': {
    label: 'Hébreu phonétique',
    transform: (e) => {
      if (!e.classList.contains(transformed)) {
        const heEl = e.parentElement.querySelector('[lang=\'he\']')
        if (heEl) {
          const text = getText(heEl)
          addSpeech(e, 'he', text.substring(0, text.indexOf(speechLabel)))
        }
      }
      return e
    }
  },
  'it': {
    label: 'Italien', transform: addSpeech
  },
  'img': {
    label: 'Image'
  }
}
