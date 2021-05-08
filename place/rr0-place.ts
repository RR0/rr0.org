import place, {MapService, PlaceService} from "./place"
import {SelectorDirective} from "note/foot"
import {directives} from "common"

class PlaceDirective extends SelectorDirective {
  constructor(private placeService: PlaceService, private mapService: MapService) {
    super(".place")
  }

  protected handle(elem: HTMLElement) {
    const title = elem.getAttribute('title')
    const placeName = title ? title : elem.innerText
    if (placeName) {
      const place = this.placeService.addPlace(placeName)
      elem.setAttribute('place-id', "place" + place.id)
      this.mapService.geocode(place, (placeOnMap) => {
        const parent = elem.parentElement
        const parentTagName = parent.tagName
        if (parentTagName === "P" || parentTagName === "LI") {
          elem.onclick = () => {
            this.mapService.focusOn(placeOnMap)
          }
          elem.style.cursor = 'pointer'
          elem.setAttribute('title', 'Cliquez pour voir la carte')
        }
        this.mapService.refresh()
      })
    }
  }
}

directives.push(new PlaceDirective(place.service, place.mapService))
