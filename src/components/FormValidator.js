export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    let errorMessage = "";

    if (inputElement.validity.valueMissing) {
      errorMessage = "Completa este campo";
    } else if (inputElement.validity.tooShort) {
      errorMessage = `Aumenta la longitud de este texto a ${inputElement.minLength} caracteres o más (actualmente, el texto tiene ${inputElement.value.length} carácter${inputElement.value.length !== 1 ? 'es' : ''}).`;
    } else if (inputElement.type === "url" && inputElement.validity.typeMismatch) {
      errorMessage = "Introduce una URL válida";
    } else {
      errorMessage = inputElement.validationMessage;
    }

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every(input => input.validity.valid);
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(this._config.inactiveButtonClass, !isFormValid);
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach(input => this._hideInputError(input));
    this._toggleButtonState();
  }
}
