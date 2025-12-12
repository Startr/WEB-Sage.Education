import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  static get targets() {
    return [ "source" ]
  }

  initialize() {
    this.element.querySelectorAll('code').forEach(el => {
      el.addEventListener('mouseover', () => {
        const definition = this.findDefinition(el.textContent)
        if (definition) {
          const definitionPop = this.createDefinitionPop(el, definition)
          el.addEventListener('mouseout', () => {
            definitionPop.classList.remove('pop--visible')
            setTimeout( () => { definitionPop.remove() }, 100)
          }, { once: true })
        }
      })
    })
  }

  findDefinition(searchText) {
    const pattern = new RegExp(searchText, "i")
    const definitions = this.getDefinitions()
    for (const term in definitions) {
      if (pattern.test(term)) {
        return definitions[term]
      }
    }
  }

  getDefinitions() {
    if (!this.definitions) {
      this.definitions = {}
      this.sourceTarget.querySelectorAll('dt').forEach(dt => {
        const term = dt.textContent
        const definition = dt.nextElementSibling.textContent
        this.definitions[term] = definition
      })
    }
    return this.definitions
  }

  createDefinitionPop(el, definition) {
    const template = `
     <div class="pop">
       ${definition}
       <div class="pop__arrow"></div>
     </div>
    `
    const pop = new DOMParser().parseFromString(template, 'text/html')
    const definitionPop = this.element.appendChild(pop.body.firstChild)
    const popperInstance = new Popper(el, definitionPop, {
      onCreate: function(data){
        definitionPop.classList.add('pop--visible')
      }
    })
    return definitionPop
  }

}
