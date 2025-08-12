export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() { this._popup.classList.add('popup_opened'); document.addEventListener('keydown', this._handleEscClose); }
  close() { this._popup.classList.remove('popup_opened'); document.removeEventListener('keydown', this._handleEscClose); }
  _handleEscClose(evt) { if (evt.key === 'Escape') this.close(); }
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('popup__button_close') ||
          evt.target.classList.contains('popup__button_close-image')) {
        this.close();
      }
    });
  }
}

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }
  setSubmitAction(action) { this._handleSubmit = action; }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) this._handleSubmit();
    });
  }
}
