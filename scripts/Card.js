export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.main__gallery-card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.main__gallery-image').src = this._link;
    this._element.querySelector('.main__gallery-image').alt = this._name;
    this._element.querySelector('.main__gallery-paragraph').textContent = this._name;

    // Aquí puedes agregar eventos como like, delete, etc.

    return this._element;
  }
}
