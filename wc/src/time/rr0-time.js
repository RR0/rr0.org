export class RR0Time extends HTMLTimeElement {
  constructor() {
    super();
    const locale = navigator.language;
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    this.innerText = new Date(this.innerText).toLocaleString(locale, dateOptions);
  }

  static get is() {
    return 'rr0-time';
  }
}

window.customElements.define('rr0-time', RR0Time, {extends: 'time'});
