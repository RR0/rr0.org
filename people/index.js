var countryInputs
var occupationInputs

function find(_e) {
  const textInput = document.querySelector("#searchForm input[name='text']")
  const value = textInput.value.toLowerCase()
  const list = document.querySelector("#searchForm + ul")
  let found = 0
  const selectedCountries = countryInputs.filter(countryInput => countryInput.checked)
    .map(countryInput => countryInput.id)
  const selectedOccupations = occupationInputs.filter(occupationInput => occupationInput.checked)
    .map(occupationInput => occupationInput.id)
  for (const child of list.children) {
    const countryClasses = Array.from(child.classList).filter(c => c.startsWith("country-"))
    const occupationClasses = Array.from(child.classList).filter(c => c.startsWith("occupation-"))
    const matchCountry = countryClasses.some(o => selectedCountries.includes(o))
    const matchOccupation = occupationClasses.some(o => selectedOccupations.includes(o))
    const matchText = child.textContent.toLowerCase().indexOf(value) >= 0
    if (matchText && matchCountry && matchOccupation) {
      child.style.display = "list-item"
      found++
    } else {
      child.style.display = "none"
    }
  }
  const output = document.querySelector("#searchForm output")
  output.textContent = `(${found > 0 ? found : "Aucune"} personne${found > 1 ? "s" : ""})`
}

{
  countryInputs = Array.from(document.querySelectorAll("#countries input[type=checkbox]"))
  for (const countryInput of countryInputs) {
    countryInput.checked = true
  }
}
{
  occupationInputs = Array.from(document.querySelectorAll("#occupations input[type=checkbox]"))
  for (const occupationInput of occupationInputs) {
    occupationInput.checked = true
  }
}
document.querySelector("#searchForm input").dispatchEvent(new Event("input"))
