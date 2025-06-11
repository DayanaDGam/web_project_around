export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.main__gallery-card')
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('main__button_like_active');
    });

    this._deleteButton.addEventListener('click', () => {
      this._cardElement.remove();
      this._cardElement = null;
    });

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector('.main__gallery-image');
    this._deleteButton = this._cardElement.querySelector('.main__button_trash');
    this._likeButton = this._cardElement.querySelector('.main__button_like');
    this._titleElement = this._cardElement.querySelector('.main__gallery-paragraph');

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
