import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, { loadingText = "Guardando..." } = {}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__content");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitBtn = this._form.querySelector('button[type="submit"]');
    this._submitDefaultText = this._submitBtn ? this._submitBtn.textContent : "";
    this._loadingText = loadingText;              // ← customizable
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => { values[input.name] = input.value; });
    return values;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      if (data[input.name] !== undefined) input.value = data[input.name];
    });
  }

  setLoading(isLoading) {
    if (!this._submitBtn) return;
    this._submitBtn.textContent = isLoading ? this._loadingText : this._submitDefaultText;
    this._submitBtn.disabled = isLoading;
    this._submitBtn.classList.toggle("popup__button_disabled", isLoading);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._submitBtn);
    });
  }

  close() {
    super.close();
    this._form.reset();
    this.setLoading(false); 
  }
}

export default PopupWithForm;
