const form = document.getElementById("searchForm")
if (form) {
  /**
   * Client-side code to filter directory listing.
   */

  let countryInputs
  let occupationInputs

  function normalize (str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
  }

  const textInput = form.querySelector("input[type='search']")

  window.findPeople = (_e) => {
    const value = normalize(textInput.value)
    const list = document.querySelector("#searchForm + ul")
    let found = 0
    const selectedCountries = countryInputs.filter(countryInput => countryInput.checked)
      .map(countryInput => countryInput.id)
    const selectedOccupations = occupationInputs.filter(occupationInput => occupationInput.checked)
      .map(occupationInput => occupationInput.id)
    for (const child of list.children) {
      const classes = Array.from(child.querySelector(".people-resolved").classList)
      const countryClasses = classes.filter(c => c.startsWith("country-"))
      const occupationClasses = classes.filter(c => c.startsWith("occupation-"))
      const matchCountry = countryClasses.length <= 0 || countryClasses.some(o => selectedCountries.includes(o))
      const matchOccupation = occupationClasses.length <= 0 || occupationClasses.some(o => selectedOccupations.includes(o))
      const matchText = normalize(child.textContent).indexOf(value) >= 0
      if (matchText && matchCountry && matchOccupation) {
        child.style.display = "list-item"
        found++
      } else {
        child.style.display = "none"
      }
    }
    const output = form.querySelector("output")
    output.textContent = `${found > 0 ? found : "Aucune"} nom${found > 1 ? "s" : ""} / ${list.children.length}`
  }

  window.setAll = function (type, value) {
    document.querySelectorAll(`[id^=${type}-]`).forEach(el => el.checked = value)
    textInput.dispatchEvent(new Event("input"))
  }

  countryInputs = Array.from(form.querySelectorAll("#countries input[type=checkbox]"))
  for (const countryInput of countryInputs) {
    countryInput.checked = true
  }
  occupationInputs = Array.from(form.querySelectorAll("#occupations input[type=checkbox]"))
  for (const occupationInput of occupationInputs) {
    occupationInput.checked = true
  }
  form.style.display = "block"
  textInput.dispatchEvent(new Event("input"))
}
