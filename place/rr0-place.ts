import place, {MapService, PlaceService} from "./place"
import {Context, SelectorDirective} from "../src/common"
import {Rr0Module} from "../src/rr0"

export class PlaceDirective extends SelectorDirective {

  constructor(private placeService: PlaceService, private mapService: MapService, private rr0: Rr0Module) {
    super(".place")
  }

  protected async handle(context: Context, el: HTMLElement) {
    const title = el.getAttribute('title')
    const placeName = title ? title : el.innerText
    if (placeName) {
      const place = this.placeService.addPlace(placeName)
      el.setAttribute('place-id', "place" + place.id)
      this.mapService.geocode(place, (placeOnMap) => {
        const parent = el.parentElement
        const parentTagName = parent.tagName
        if (parentTagName === "P" || parentTagName === "LI") {
          el.onclick = () => {
            this.rr0.focusOn(placeOnMap)
          }
          el.style.cursor = 'pointer'
          el.setAttribute('title', 'Cliquez pour voir la carte')
        }
        this.mapService.refresh()
      })
    }
  }
}
