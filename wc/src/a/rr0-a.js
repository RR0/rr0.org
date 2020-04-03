(function () {
  'use strict';

  const page = document.querySelector('rr0-page');

  class RR0Anchor extends HTMLAnchorElement {
    constructor() {
      super();
      // Add "target=_blank" to external links so they will be opened in separate tabs
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
      let urlPath = this.pathname;
      page.load(urlPath);
    }
  }

  window.customElements.define('rr0-a', RR0Anchor, {extends: 'a'});
  window.onpopstate = function (event) {
    event.preventDefault();
    page.fetch(event.state.previousPath);
  };
})();
