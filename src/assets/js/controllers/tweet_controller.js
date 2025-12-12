import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  static get targets() {
    return [ "iconTemplate" ]
  }

  initialize() {
    this.createTweetPop()
    this.updateRect()
    this.tweetPopper = new Popper(this, this.tweetPop, {
      placement: 'top',
      modifiers: { offset: { offset: '0,5' } },
    })
  }

  updateRect(hide) {
    if (!hide && this.range) {
      this.rect = this.range.getBoundingClientRect()
    } else {
      this.rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0
      }
    }
    this.rectChangedCallback(this.rect)
  }

  update(evt, hide) {
    const selection = document.getSelection()
    this.range = selection && selection.rangeCount && selection.getRangeAt(0)
    this.updateRect(hide)
  }

  rectChangedCallback({ width }) {
    if (width > 0.1) {
      this.tweetPop.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.getSelection().toString() + ' ' + window.location.href)
      this.tweetPopper.scheduleUpdate()
      this.tweetPop.classList.add('pop--visible')
    } else {
      this.tweetPop.classList.remove('pop--visible')
    }
  }

  getBoundingClientRect() {
    return this.rect
  }

  createTweetPop() {
    const template = `
     <a class="pop">
       ${this.iconTemplateTarget.innerHTML}
       <div class="pop__arrow"></div>
     </a>
    `
    const pop = new DOMParser().parseFromString(template, 'text/html')
    this.tweetPop = document.querySelector('body').appendChild(pop.body.firstChild)
  }

}
