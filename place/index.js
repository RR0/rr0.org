var currentAddress
var mapEl
var currentPlaceEl

function showMap (event, address, display = true, mode = 'place') {
  event.stopPropagation()
  document.body.classList.toggle("with-map", display)
  if (!address) {
    address = currentPlaceEl?.textContent
  }
  if (address !== currentAddress) {
    currentAddress = address
    let qs
    switch (mode) {
      case 'streetview':
        qs = address
        break
      default:
        qs = `q=${address}&maptype=satellite`
    }
    mapEl.querySelector("iframe").src =
      `https://www.google.com/maps/embed/v1/${mode}?${qs}&key=${mapsApiKey}`
  }
}

const mapToggle = document.querySelector(".map-toggle .toggle")

document.addEventListener("DOMContentLoaded", () => {
  mapEl = document.querySelector("#map-canvas")
  currentPlaceEl = document.querySelector(".plac")
  if (currentPlaceEl) {
    mapToggle.style.display = "inline-block"
  }
})

function hasMap() {
  return document.body.classList.contains("with-map")
}

mapToggle.addEventListener("click", (event) => {
  showMap(event, currentAddress, !hasMap())
})
document.body.addEventListener("click", (event) => {
  if (hasMap()) {
    showMap(event, currentAddress, false)
  }
})
