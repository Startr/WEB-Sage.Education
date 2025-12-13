import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  static get targets() {
    return [ "iconTemplate" ]
  }

  initialize() {
    for (let level = 1; level <= 6; level++) {
      this.linkifyAnchors(level, this.element)
    }
  }

  linkifyAnchors(level, containingElement){
    const headers = containingElement.querySelectorAll('h' + level)
    headers.forEach(header => {
      if (typeof header.id !== "undefined" && header.id !== "") {
        header.appendChild(this.anchorForId(header.id, header.innerHTML))
      }
    })
  }

  anchorForId(id, title) {
    const template = `
     <a class="anchor-link" href="${'#' + id}" aria-label="${title}">
       ${this.iconTemplateTarget.innerHTML}
     </a>
    `
    const anchor = new DOMParser().parseFromString(template, 'text/html')
    return anchor.body.firstChild
  }

}
