// index.js
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { validationConfig, initialCards } from './utils.js';

// DOM: Contenedor donde se agregan las tarjetas
const cardList = document.querySelector('.cards__list');

// DOM: Formulario y campos
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('#place-name');
const linkInput = formElement.querySelector('#place-link');

// DOM: Botón abrir/cerrar popup, etc. (si aplica)
const addCardButton = document.querySelector('.add-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close');

// Función: Crea una nueva tarjeta
function createCard(data) {
  const card = new Card(
    data,
    '#card-template',
    handleCardClick
  );
  return card.generateCard();
}

// Función: Renderiza una tarjeta en la lista
function renderCard(data) {
  const cardElement = createCard(data);
  cardList.prepend(cardElement); // prepend para que la más nueva esté arriba
}

// Función: Acción al hacer clic en imagen (popup, etc.)
function handleCardClick(name, link) {
  // Aquí podrías abrir un popup, por ejemplo
  console.log(`Mostrar imagen de ${name}: ${link}`);
}

// Evento: Envío de formulario
function handleFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: nameInput.value,
    link: linkInput.value
  };
  renderCard(newCardData);
  formElement.reset();
  formValidator.resetValidation();
  closePopup(); // Si tienes popup
}

// Función: Abrir el popup
function openPopup() {
  popup.classList.add('popup_opened');
}

// Función: Cerrar el popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Listeners
formElement.addEventListener('submit', handleFormSubmit);
addCardButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

// Inicializa validación
const formValidator = new FormValidator(validationConfig, formElement);
formValidator.enableValidation();

// Renderiza tarjetas iniciales (si las usas)
initialCards.forEach(renderCard);

