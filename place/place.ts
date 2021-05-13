import rr0 from "../src/index"

function Place(n) {
  this.name = n
}

declare var google
declare var Swipe
declare var $

export class MapService {
  geocoder
  myMap
  totalBounds
  peoplePoints = []
  mapZone
  latestPlaceOnMap
  planetarium
  zoomMin = 1
  zoomMax = 10
  mapToggled
  mapUpdateCallbacks = [this.mapResize]
  mySwipe
  toGeocode = []
  peoplePath
  m
  iw

  initSkyMap() {
    this.planetarium = $.virtualsky({
      id: 'starmap',
      langurl: 'lang/%LANG%.json',
      language: 'fr',
      meteorshowers: true,
      showstarlabels: true,
      showorbits: true,
      ground: true,
      fov: 5,
      projection: 'stereo'
    })
  }

  geocode(p, callback) {
    if (!this.geocoder) {
      if (this.toGeocode.length === 0) {
        this.init(rr0.getSideZone("map-canvas"), this.onceMapIsLoaded)
      }
      this.toGeocode.push({place: p, callback: callback})
    } else {
      this.geocodeNow(p, callback)
    }
  }

  focusOn(placeOnMap) {
    if (this.isMapWidthAvailable()) {
      this.mapShow()
    }
    if (this.isPlanetariumWidthAvailable()) {
      this.planetariumShow()
    }
    if (this.isMapVisible()) {
      placeOnMap.show()
    }
  }

  refresh() {
    this.mapResize()
  }

  /**
   *
   * @param lat
   * @param lng
   * @param kmlUrl
   * @param zoom
   * @param mapType "hybrid", "terrain"
   * @param anchor The id of the element that will contain the map. "map-canvas" by default.
   */
  loadMap(lat, lng, kmlUrl, zoom, mapType, anchor) {
    (<any>window).onGoogleMapsLoaded.push(function () {
      const mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: mapType
      }
      const map = new google.maps.Map(document.getElementById(anchor ? anchor : 'map-canvas'), mapOptions)
      if (zoom) {
        map.setZoom(zoom)
      }
      const ctaLayer = new google.maps.KmlLayer(kmlUrl)
      ctaLayer.setMap(map)
      this.peoplePath = new google.maps.Polyline({
        path: this.peoplePoints,
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 3
      })
      this.peoplePath.setMap(map)
    })
  }

  private geocodeNow(place, callback) {
    this.geocoder.geocode({'address': place.name}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const loc = results[0].geometry.location
        this.peoplePath.getPath().push(loc)
        this.totalBounds.extend(loc)
        const placeBounds = new google.maps.LatLngBounds()
        placeBounds.extend(loc)
        place.bounds = placeBounds
        const placeOnMap = this.PlaceOnMap(place)
        callback(placeOnMap)
      }
    })
  }

  private geocodeAll() {
    for (let i = 0; i < this.toGeocode.length; i++) {
      const waitingToBeGeocoded = this.toGeocode[i]
      this.geocodeNow(waitingToBeGeocoded.place, waitingToBeGeocoded.callback)
    }
  }

  private fitBounds(bounds) {
    this.myMap.fitBounds(bounds)
    let z = this.myMap.getZoom()
    if (z > this.zoomMax) {
      z = this.zoomMax
    }
    this.myMap.setZoom(z)
  }

  private close() {
    this.iw.close()
  }

  private PlaceOnMap(place) {
    const m = new google.maps.Marker({
      position: place.bounds.getCenter(),
      map: this.myMap,
      title: place.name
    })
    m.setMap(this.myMap)
    this.iw = new google.maps.InfoWindow({
      content: place.name
    })
    const show = () => {
      if (this.latestPlaceOnMap) {
        this.latestPlaceOnMap.close()
      }
      this.iw.open(this.myMap, this.m)

      if (this.planetarium) {
        this.planetarium.setLatitude(this.m.position.lat())
        this.planetarium.setLongitude(this.m.position.lng())
        this.planetarium.draw()
      }

      this.latestPlaceOnMap = this
      this.fitBounds(place.bounds)
    }
    google.maps.event.addListener(this.m, 'click', () => {
      show()
    })
  }

  private initGoogleMaps(mz, callback) {
    google.load("maps", "3", {
      other_params: "sensor=false",
      callback: () => {
//                    place.sideCallbacks = place.sideCallbacks.concat(mapUpdateCallbacks);
        this.mapZone = mz
        this.mapZone.addEventListener('DOMMouseScroll', function (e) {   // Disable map slide propagation to container
          // sliding zone
          e.stopPropagation()
        }, false)

        this.geocoder = new google.maps.Geocoder()
        const mapType = "hybrid"
        const mapOptions = {
          mapTypeId: mapType
//                ,minZoom: zoomMin
        }
        this.myMap = new google.maps.Map(document.getElementById(this.mapZone.id), mapOptions)
        this.totalBounds = new google.maps.LatLngBounds()
        this.peoplePath = new google.maps.Polyline({
          path: this.peoplePoints,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: 3
        })
        this.peoplePath.setMap(this.myMap)
        callback(this.geocoder)
      }
    })
  }

  private init(mz, callback) {
    this.initGoogleMaps(mz, callback)
    this.initSkyMap()
  }

  private mapRebound(bounds) {
    google.maps.event.trigger(this.myMap, 'resize')
    this.fitBounds(bounds)
    if (!this.mapToggled) {
      this.mapToggled = true
    }
  }

  private mapResize() {
    this.mapRebound(this.totalBounds)
  }

  private mapRefresh() {
    const bounds = this.totalBounds
    if (!this.myMap.getBounds()) {
      google.maps.event.addListener(this.myMap, 'bounds_changed', () => {
        setTimeout(() => {
          this.mapRebound(bounds)
        }, 600)
      })
      if ((<any>window).getPeople()) {
        this.peoplePath = new google.maps.Polyline({
          path: this.peoplePoints,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: 3
        })
        this.peoplePath.setMap(this.myMap)
      }
      setTimeout(() => {
        this.myMap.fitBounds(bounds)
      }, 800)
    }
  }

  private mapUpdate(i) {
    const mapVisible = this.isMapVisible() || i > 0
    if (mapVisible) {
      this.mapRefresh()
    }
    const toggleButton = document.getElementsByClassName("toggleMap")[0]
    if (mapVisible) {
      toggleButton.className += " selected"
    } else {
      toggleButton.className = "constant toggleMap"
    }
  }

  private onTransitionEnd(e, ar) {
    for (let i = 0; i < ar.length; i++) {
      const events = ar[i]
      e.addEventListener('webkitTransitionEnd', events, false)
      e.addEventListener('msTransitionEnd', events, false)
      e.addEventListener('oTransitionEnd', events, false)
      e.addEventListener('otransitionend', events, false)
      e.addEventListener('transitionend', events, false)
    }
  }

  private addMapButton() {
    const element: HTMLElement = <HTMLElement>document.querySelector('.toggleMap')
    element.style.display = 'inline-block'
    element.title = 'Affiche carte'
    element.onclick = this.toggleMap
  }

  private getSwipe() {
    if (!this.mySwipe) {
      this.mySwipe = new Swipe(rr0.contentsZone.parentNode.parentNode, // Create slider after adding zone it will manage
        {
          continuous: false,
          stopPropagation: true,
          callback: this.mapUpdate
        })
    }
    return this.mySwipe
  }

  private mapHide() {
    if (this.isMapWidthAvailable()) {
      this.splitWithMap(rr0.getScreenWidth())
    } else {
      this.getSwipe().prev()
    }
  }

  private toggleMap() {
    const mapVisible = this.isMapVisible()
    if (mapVisible) {
      this.mapHide()
    } else {
      this.mapShow()
    }
  }

  private onceMapIsLoaded() {
    this.geocodeAll()
    this.addMapButton()
//            if (org.rr0.getScreenWidth() > 1024) {
//                mapShow();
//            }
    this.onTransitionEnd(rr0.contentsZone, this.mapUpdateCallbacks)
  }

  private isMapWidthAvailable() {
    return rr0.getScreenWidth() > 320
  }

  private isPlanetariumWidthAvailable() {
    return rr0.getScreenHeight() > 400
  }

  private isMapVisible() {
    return rr0.leftWidth < rr0.getScreenWidth()
  }

  private mapShow() {
    const sideWidth = rr0.getScreenWidth() - rr0.leftWidth
    if (sideWidth <= 0) {
      rr0.leftWidth = rr0.getScreenWidth() * ((100 - 28) / 100)
    }
    this.splitWithMap(rr0.leftWidth)
    //org.rr0.time.drawChart();
  }

  private planetariumShow() {
    (document.querySelector('#starmap') as HTMLElement).style.height = '25%';
    (document.querySelector('#map-canvas') as HTMLElement).style.height = '75%'
    this.planetarium.createSky()
  }

  private splitWithMap(contentWidth) {
    rr0.leftWidth = contentWidth
    rr0.updateDivision()
  }
}

export class PlaceService {
  places = []

  constructor() {
  }

  addPlace(placeName: string) {
    const place = new Place(placeName)
    this.places.push(place)
    place.id = this.places.length
    document.querySelector('.contents').classList.remove('no-side')
    return place
  }
}

export class PlaceModule {
  mapService: MapService
  readonly service: PlaceService

  constructor() {
    this.mapService = new MapService()
    this.service = new PlaceService()
  }
}

const place = new PlaceModule()
export default place
