export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement, message) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) errorElement.textContent = message || inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
    if (errorElement) errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    if (errorElement) {
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = "";
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _disableButton() {
    if (!this._submitButton) return;
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton() {
    if (!this._submitButton) return;
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
    this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
