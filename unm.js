const $utils = {
  camel: e=>e.replace(/\b-([a-z])/g,(e,a)=>a.toUpperCase()),
  getRawElement: iden => iden instanceof Event ? iden.target : iden instanceof q22 ? iden.element : iden instanceof HTMLElement || iden instanceof HTMLDocument ? iden : document.querySelector(iden)
}

class q22 {
  constructor(iden) {
    this.element = $utils.getRawElement(iden)
  }

  text(innerText) {
    this.element.innerText = innerText;
    return this
  }

  html(innerHTML) {
    this.element.innerHTML = innerHTML;
    return this
  }

  wrap(tag) {
    const newElement = document.createElement(tag);
    this.element.parentNode.insertBefore(newElement, this.element)
    newElement.appendChild(this.element);
    return this
  }

  style(property, value) {
    let camelizedProperty = $utils.camel(property);
    this.element.style[camelizedProperty] = value;
    return this
  }
  
  on(listener, callback) {
    this.element.addEventListener(listener, callback);
    return this
  }
  
  off(listener, callback) {
    this.element.removeEventListener(listener, callback)
    return this
  }
  
  once(listener, callback) {
    this.element.addEventListener(listener, callback, {once:true});
    
    return this
  }
}

function q22a(iden) {
  let element = Array.isArray(iden) ? iden : Array.from(document.querySelectorAll(iden))
  return new Proxy(q22.prototype, {
    get(target, property) {
      if (typeof Reflect.get(target, property) == "function") {
        return function(...args) {
          for (const e of element) {
            q22.prototype[property].call({element:e}, ...args)
          }
          return q22a(element)
        }
      } else if (property == "element") {
          return element
      }
    }
  })
}


let $ = i => new q22(i)
let $$ = i => q22a(i)
