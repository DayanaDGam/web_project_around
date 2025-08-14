export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;                             
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    if (!Array.isArray(items)) return;                     
    items.forEach((item) => this._renderer(item));         
  }

  addItem(element, { append = false } = {}) {
    if (!element) return;
    append ? this._container.append(element)                
           : this._container.prepend(element);             
  }

  clear() {
    this._container.innerHTML = "";
  }
}

export default Section;

