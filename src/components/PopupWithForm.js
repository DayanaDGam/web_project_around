import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__content");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitBtn = this._form.querySelector('button[type="submit"]');
    this._submitDefaultText = this._submitBtn ? this._submitBtn.textContent : "";
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

  setLoading(isLoading, loadingText = "Guardando...") {
    if (!this._submitBtn) return;
    this._submitBtn.textContent = isLoading ? loadingText : this._submitDefaultText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // pasamos formData + referencia al botón de submit
      this._handleFormSubmit(this._getInputValues(), this._submitBtn);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
