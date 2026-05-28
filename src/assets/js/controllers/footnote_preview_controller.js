import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  initialize() {
    this.element.querySelectorAll('sup.footnote-ref a, .footnote-ref a').forEach(ref => {
      ref.addEventListener('mouseenter', () => this.show(ref));
      ref.addEventListener('mouseleave', () => this.hide());
      ref.addEventListener('focus', () => this.show(ref));
      ref.addEventListener('blur', () => this.hide());
    });
  }

  show(ref) {
    const href = ref.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    this.hide();

    const pop = document.createElement('div');
    pop.className = 'footnote-preview';
    pop.innerHTML = target.innerHTML;
    document.body.appendChild(pop);

    if (typeof Popper !== 'undefined') {
      this.popper = new Popper(ref, pop, {
        placement: 'top',
        modifiers: { offset: { offset: '0, 8' } }
      });
    } else {
      const rect = ref.getBoundingClientRect();
      pop.style.left = (rect.left + window.scrollX) + 'px';
      pop.style.top = (rect.bottom + window.scrollY + 8) + 'px';
    }
    this.popover = pop;
  }

  hide() {
    if (this.popper) { this.popper.destroy(); this.popper = null; }
    if (this.popover) { this.popover.remove(); this.popover = null; }
  }
}
