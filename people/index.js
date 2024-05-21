/**
 * Client-side code to filter directory listing.
 */

let countryInputs
let occupationInputs

const form = document.getElementById('searchForm')

window.findPeople = (_e) => {
  const textInput = form.querySelector('input[type=\'search\']')

  function normalize (str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
  }

  const value = normalize(textInput.value)
  const list = document.querySelector('#searchForm + ul')
  let found = 0
  const selectedCountries = countryInputs.filter(countryInput => countryInput.checked)
    .map(countryInput => countryInput.id)
  const selectedOccupations = occupationInputs.filter(occupationInput => occupationInput.checked)
    .map(occupationInput => occupationInput.id)
  for (const child of list.children) {
    const classes = Array.from(child.querySelector('.people-resolved').classList)
    const countryClasses = classes.filter(c => c.startsWith('country-'))
    const occupationClasses = classes.filter(c => c.startsWith('occupation-'))
    const matchCountry = countryClasses.length <= 0 || countryClasses.some(o => selectedCountries.includes(o))
    const matchOccupation = occupationClasses.length <= 0 || occupationClasses.some(o => selectedOccupations.includes(o))
    const matchText = normalize(child.textContent).indexOf(value) >= 0
    if (matchText && matchCountry && matchOccupation) {
      child.style.display = 'list-item'
      found++
    } else {
      child.style.display = 'none'
    }
  }
  const output = form.querySelector('output')
  output.textContent = `${found > 0 ? found : 'Aucune'} personne${found > 1 ? 's' : ''} / ${list.children.length}`
}

countryInputs = Array.from(form.querySelectorAll('#countries input[type=checkbox]'))
for (const countryInput of countryInputs) {
  countryInput.checked = true
}
occupationInputs = Array.from(form.querySelectorAll('#occupations input[type=checkbox]'))
for (const occupationInput of occupationInputs) {
  occupationInput.checked = true
}
form.style.display = 'block'
form.querySelector('input').dispatchEvent(new Event('input'))
