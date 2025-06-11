import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { validationConfig } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const cardList = document.querySelector('.main__gallery');
  const formElement = document.querySelector('#formAdd');
  const nameInput = formElement.querySelector('#title-input');
  const linkInput = formElement.querySelector('#url-input');
  const addCardButton = document.querySelector('.main__button_add');
  const popup = document.querySelector('#popupAdd');
  const closePopupButton = popup.querySelector('.popup__button_close');

  const editProfileButton = document.querySelector('.main__button_edit');
  const popupEdit = document.querySelector('#popupEdit');
  const closeEditPopupButton = popupEdit.querySelector('.popup__button_close');
  const formEditElement = document.querySelector('#formEdit');

  function handleCardClick(name, link) {
    console.log(`Mostrar imagen de ${name}: ${link}`);
  }

  function createCard(data) {
    const card = new Card(data, '#main__template', handleCardClick);
    return card.generateCard();
  }

  function renderCard(data) {
    const cardElement = createCard(data);
    cardList.prepend(cardElement);
  }

  function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
  }

  function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    const newCardData = {
      name: nameInput.value,
      link: linkInput.value
    };
    renderCard(newCardData);
    formElement.reset();
    formValidatorAdd.resetValidation();
    closePopup(popup);
  }

  if (formElement) {
    formElement.addEventListener('submit', handleFormSubmit);
  }

  if (addCardButton) {
    addCardButton.addEventListener('click', () => openPopup(popup));
  }

  if (closePopupButton) {
    closePopupButton.addEventListener('click', () => closePopup(popup));
  }

  if (editProfileButton) {
    editProfileButton.addEventListener('click', () => openPopup(popupEdit));
  }

  if (closeEditPopupButton) {
    closeEditPopupButton.addEventListener('click', () => closePopup(popupEdit));
  }

  if (formEditElement) {
  formEditElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const name = formEditElement.querySelector('#name-input').value;
    const about = formEditElement.querySelector('#about-input').value;

    document.querySelector('.main__paragraph_name').textContent = name;
    document.querySelector('.main__paragraph_about').textContent = about;

    closePopup(popupEdit);
  });
}

  // Validación
  const formValidatorAdd = new FormValidator(validationConfig, formElement);
  const formValidatorEdit = new FormValidator(validationConfig, formEditElement);

  formValidatorAdd.enableValidation();
  formValidatorEdit.enableValidation();
});
