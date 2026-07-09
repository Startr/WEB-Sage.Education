import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  static get targets() {
    return [ "menu", "content" ]
  }

  open() {
    this.menuTarget.classList.add('menu--show')
    this.element.classList.add('modal-open')
    this.contentTarget.querySelectorAll('a').forEach(entry => {
      entry.tabIndex = '-1'
    })
  }

  close() {
    if (this.menuTarget.classList.contains('menu--show')) {
      this.menuTarget.classList.remove('menu--show')
      this.element.classList.remove('modal-open')
      this.contentTarget.querySelectorAll('a').forEach(entry => {
        entry.removeAttribute('tabIndex')
      })
    }
  }

  closeWithKey(event) {
    if (event.keyCode === 27) {
      this.close()
    }
  }

}
