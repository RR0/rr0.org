function langTags(value) {
  const selector = value ? `*[lang="${value}"]` : "*[lang]"
  const tags = Array.from(document.querySelectorAll(selector))
  return tags.filter(element => !["HTML", "I"].includes(element.nodeName))
}

var clicked = () => {
  const langInputs = document.querySelectorAll(`form input[type="checkbox"]`)
  for (const langInput of langInputs) {
    const paragraphs = langTags(langInput.value)
    for (const paragraph of paragraphs) {
      paragraph.style.display = langInput.checked ? "block" : "none"
    }
  }
}

const langLabels = {
  "fr": "Français",
  "fro": "Français ancien",
  "ar": "Arabe",
  "ar-Latn": "Arabe phonétique",
  "he": "Hébreu",
  "he-Latn": "Hébreu phonétique",
  "img": "Image"
}

var checked = ["fr"]

function ready() {
  const ps = langTags()
  const langs = ps.reduce((ls, p) => {
    ls.add(p.lang)
    return ls
  }, new Set())
  const form = document.querySelector(".lang-form")
  for (const lang of langs) {
    const label = document.createElement("label")
    const input = document.createElement("input")
    input.type = "checkbox"
    input.name = "lang"
    input.value = lang
    input.onclick = clicked
    if (checked.includes(lang)) {
      input.checked = true
    }
    label.appendChild(input)
    label.append(" " + langLabels[lang])
    form.append(label)
  }
  clicked()
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready)
} else {
  ready()
}
