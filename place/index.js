var currentAddress
var mapEl

function showMap(event, address, display = true) {
  event.stopPropagation()
  document.body.classList.toggle("with-map", display)
  if (!address) {
    const currentPlaceEl = document.querySelector(".plac")
    address = currentPlaceEl?.textContent
  }
  if (address !== currentAddress) {
    currentAddress = address
    mapEl.querySelector("iframe").src =
      `https://www.google.com/maps/embed/v1/place?q=${address}&maptype=satellite&key=${mapsApiKey}`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mapEl = document.querySelector("#map-canvas")
})

function hasMap() {
  return document.body.classList.contains("with-map")
}

const mapToggle = document.querySelector(".map-toggle .toggle")
mapToggle.addEventListener("click", (event) => {
  showMap(event, currentAddress, !hasMap())
})
document.body.addEventListener("click", (event) => {
  if (hasMap()) {
    showMap(event, currentAddress, false)
  }
})
