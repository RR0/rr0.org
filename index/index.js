var clicked = () => {
  const langInputs = document.querySelectorAll("form input[type=\"checkbox\"]")
  for (const langInput of langInputs) {
    const paragraphs = document.querySelectorAll(`p[lang="${langInput.value}"]`)
    for (const paragraph of paragraphs) {
      paragraph.style.display = langInput.checked ? "block" : "none"
    }
  }
}
