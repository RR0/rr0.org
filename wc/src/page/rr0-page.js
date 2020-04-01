export class RR0Page extends HTMLElement {

  constructor() {
    super();
    this.template = document.createElement('template');
    this.sd = this.attachShadow({mode: 'open'});
    this.load('/science/crypto/ufo/enquete/dossier/Roswell');
  }


  fetch(urlPath) {
    return window.fetch(urlPath).then(res => res.text()).then(pageHtml => {
      const style = `@import "/wc/page/rr0-page.css";`;
      const loadedPageTemplate = document.createElement('template');
      loadedPageTemplate.innerHTML = pageHtml;
      const fullContents = loadedPageTemplate.content;
      let newTitle = fullContents.querySelector('title').innerText;
      this.setTitle(newTitle);
      const newContent = `<style>${style}</style>${fullContents.querySelector('.text').innerHTML}`;
      this.template.innerHTML = newContent;
      if (this.sd.childElementCount > 0) {
        this.sd.innerHTML = '';
      }
      this.sd.appendChild(this.template.content);
      return newTitle;
    });
  }

  load(urlPath) {
    this.fetch(urlPath).then(newTitle => {
      const state = {previousPath: urlPath};
      window.history.pushState(state, newTitle, urlPath);
    });
  }

  setTitle(title) {
    title = title.replace(/\n/g, '');
    document.title = title;
    document.getElementById('title').innerText = title;
  }
}

window.customElements.define('rr0-page', RR0Page);
