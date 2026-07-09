import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  static get targets() {
    return [ "button" ]
  }

  initialize() {
    this.observer = new IntersectionObserver(this.onIntersection.bind(this))
  }

  connect() {
    const storageLocation = this.data.get('id')
    if (this.hasButtonTarget) {
      if (localStorage.getItem(storageLocation)) {
        this.buttonTarget.innerHTML = 'Continue from where you left off &rarr;'
        this.buttonTarget.href = localStorage.getItem(storageLocation)
      }
    } else {
      localStorage.setItem(storageLocation, window.location.pathname);
      this.element.querySelectorAll('h2').forEach(heading => {
        this.observer.observe(heading)
      })
    }
  }

  onIntersection(entries) {
    const storageLocation = this.data.get('id')
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let currentlocation = window.location.pathname+'#'+entry.target.id
        localStorage.setItem(storageLocation, currentlocation)
      }
    })
  }

}
