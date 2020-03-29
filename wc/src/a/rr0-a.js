'use strict';

const page = document.querySelector('rr0-page');

export class RR0Anchor extends HTMLAnchorElement {
  constructor() {
    super();
    /*
     * Adds "target=_blank" to external links so they will be opened in separate tabs
     */
    let host = 'rr0.org';
    if (this.hostname && this.hostname.indexOf('.') > 0 && this.hostname !== host) {
      this.target = '_blank';
    }
    this.addEventListener('click', this.onclick.bind(this));
  }

  static get is() {
    return 'rr0-a';
  }

  onclick(event) {
    event.preventDefault();
    page.fetch(this.pathname);
  }
}

window.customElements.define('rr0-a', RR0Anchor, {extends: 'a'});
window.onpopstate = function (event) {
  page.fetch(window.location);
};
