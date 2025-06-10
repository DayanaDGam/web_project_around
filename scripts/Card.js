// Card.js
export class Card {
    constructor({ name, link }, templateSelector, handleCardClick) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
  
      // Elementos de DOM
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.card__image');
      this._likeButton = this._element.querySelector('.card__like-button');
      this._deleteButton = this._element.querySelector('.card__delete-button');
    }
  
    // Clona el template de la tarjeta
    _getTemplate() {
      const template = document.querySelector(this._templateSelector).content;
      return template.querySelector('.card').cloneNode(true);
    }
  
    // Configura los listeners
    _setEventListeners() {
      this._likeButton.addEventListener('click', this._handleLikeButton);
      this._deleteButton.addEventListener('click', this._handleDeleteCard);
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    }
  
    // Lógica de "me gusta"
    _handleLikeButton = () => {
      this._likeButton.classList.toggle('card__like-button_active');
    };
  
    // Lógica de eliminación
    _handleDeleteCard = () => {
      this._element.remove();
      this._element = null;
    };
  
    // Construye la tarjeta final
    generateCard() {
      this._cardImage.src = this._link;
      this._cardImage.alt = `Imagen de ${this._name}`;
      this._element.querySelector('.card__title').textContent = this._name;
  
      this._setEventListeners();
      return this._element;
    }
  }
  