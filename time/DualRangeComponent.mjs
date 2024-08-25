const html = `
<input id="fromSlider" type="range"/>
<input id="toSlider" type="range"/>
<div id="fromSlider-value"></div>
<div id="toSlider-value"></div>
`
const sliderWidth = 4 * 16

const css = `
:host {
  display: flex;
  flex-direction: column;
  position: relative;
  color: grey;
}

#fromSlider-value, #toSlider-value {
  user-select: none;
  position: absolute;
  z-index: 1;
}

.sliders_control {
  position: relative;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: ${sliderWidth}px;
  height: 2em;
  padding: 0.25em 0.5em;
  background-color: #fff;
  border-radius: 0.5em;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
  content: "1234";
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: ${sliderWidth}em;
  height: 2em;
  padding: 0.25em 0.5em;
  background-color: #fff;
  border-radius: 0.5em;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
  content: "1234";
}

input[type=range]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type=range]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type="range"] {
  -webkit-appearance: none; 
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #C6C6C6;
  pointer-events: none;
}

#fromSlider {
  height: 0;
  z-index: 1;
}
`
const template = document.createElement("template")
template.innerHTML = `<style>${css}</style>${html}`

export class DualRangeComponent extends HTMLElement {

  sliderColor = "#C6C6C6"
  rangeColor = "#25daa5"
  fromSlider
  fromSliderValue
  toSlider
  toSliderValue

  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.fromSlider = this.shadow.querySelector("#fromSlider")
    this.fromSliderValue = this.shadow.querySelector("#fromSlider-value")
    this.toSlider = this.shadow.querySelector("#toSlider")
    this.toSliderValue = this.shadow.querySelector("#toSlider-value")
    this.fillSlider(this.fromSlider, this.toSlider, this.toSlider)
    this.setToggleAccessible(this.toSlider)
    this.fromSlider.oninput = () => this.controlFromSlider()
    this.toSlider.oninput = () => this.controlToSlider()
    this.controlFromSlider()
  }

  setMin (value) {
    this.fromSlider.min = this.fromSlider.min = this.toSlider.min = value
    this.fromSlider.setAttribute("value", value)
    this.fillSlider(this.fromSlider, this.toSlider, this.toSlider)
  }

  setMax (value) {
    this.fromSlider.max = this.fromSlider.max = this.toSlider.max = value
    this.toSlider.setAttribute("value", value)
    this.fillSlider(this.fromSlider, this.toSlider, this.toSlider)
  }

  setPos (el, slider, value) {
    const scale = slider.max - slider.min
    const deltaValue = value - slider.min
    // console.log("deltaValue", deltaValue)
    const pos = deltaValue * 100 / scale
    // console.log("pos", pos)
    el.style.left = `calc(${pos}% + ${(sliderWidth / 2) - pos * 0.65}px)`
  }

  controlFromSlider () {
    const [from, to] = this.getParsed(this.fromSlider, this.toSlider)
    this.fillSlider(this.fromSlider, this.toSlider, this.toSlider)
    this.fromSlider.value = from > to ? to : from
    this.fromSliderValue.textContent = from
    this.setPos(this.fromSliderValue, this.fromSlider, this.fromSlider.value)
  }

  controlToSlider () {
    const [from, to] = this.getParsed(this.fromSlider, this.toSlider)
    this.fillSlider(this.fromSlider, this.toSlider, this.toSlider)
    this.setToggleAccessible(this.toSlider)
    this.toSlider.value = from <= to ? to : from
    this.toSliderValue.textContent = to
    this.setPos(this.toSliderValue, this.toSlider, this.toSlider.value)
  }

  getParsed (currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10)
    const to = parseInt(currentTo.value, 10)
    return [from, to]
  }

  fillSlider (from, to, controlSlider) {
    const rangeDistance = to.max - to.min
    const fromPosition = from.value - to.min
    const toPosition = to.value - to.min
    controlSlider.style.background = `linear-gradient(
      to right,
      ${this.sliderColor} 0%,
      ${this.sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${this.rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${this.rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${this.sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${this.sliderColor} 100%)`
  }

  setToggleAccessible (currentTarget) {
    const toSlider = this.shadow.querySelector("#toSlider")
    toSlider.style.zIndex = Number(currentTarget.value) <= 0 ? 2 : 0
  }
}

const name = "rr0-dual-range"
if (!customElements.get(name)) {
  customElements.define(name, DualRangeComponent)
}
