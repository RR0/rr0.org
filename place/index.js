function showMap(address) {
  const mapEl = document.querySelector("#map-canvas")
  if (address) {
    mapEl.style.display = "block"
    mapEl.querySelector("iframe").src =
      `https://www.google.com/maps/embed/v1/place?q=${address}&maptype=satellite&key=AIzaSyDqiEN85qBXI9QJFlJM5E0LMOcllLvuR4I`
  } else {
    mapEl.style.display = "none"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const firstPlace = document.querySelector(".plac")
  if (firstPlace) {
    showMap(firstPlace.textContent)
  }
})
