// FormValidator.js
export class FormValidator {
    constructor(config, formElement) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
  
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
  
    // Muestra mensaje de error
    _showInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    }
  
    // Oculta mensaje de error
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._errorClass);
    }
  
    // Verifica validez de un input
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    // Activa o desactiva el botón de envío
    _toggleButtonState() {
      const isFormValid = this._inputList.every(input => input.validity.valid);
      this._buttonElement.disabled = !isFormValid;
      this._buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
    }
  
    // Asigna listeners a los inputs
    _setEventListeners() {
      this._toggleButtonState(); // Estado inicial
      this._inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
  
    // Método público para habilitar la validación
    enableValidation() {
      this._setEventListeners();
    }
  
    // Método público para reiniciar el estado del formulario
    resetValidation() {
      this._inputList.forEach(input => this._hideInputError(input));
      this._toggleButtonState();
    }
  }
  