var currentAddress
var mapEl
var currentPlaceEl

function showMap(event, address, display = true) {
  event.stopPropagation()
  document.body.classList.toggle("with-map", display)
  if (!address) {
    address = currentPlaceEl?.textContent
  }
  if (address !== currentAddress) {
    currentAddress = address
    mapEl.querySelector("iframe").src =
      `https://www.google.com/maps/embed/v1/place?q=${address}&maptype=satellite&key=${mapsApiKey}`
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
