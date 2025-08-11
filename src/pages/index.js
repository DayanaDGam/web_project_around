import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationConfig, initialCards } from '../constants/utils.js';
import { Api } from '../components/Api.js';

document.addEventListener('DOMContentLoaded', () => {
  const userInfo = new UserInfo({
    nameSelector: '.main__paragraph_name',
    aboutSelector: '.main__paragraph_about'
  });

  const imagePopup = new PopupWithImage('.popup_image');
  imagePopup.setEventListeners();

  function createCard(data) {
    const card = new Card(data, '#main__template', (name, link) => {
      imagePopup.open(name, link);
    });
    return card.generateCard();
  }

  const section = new Section({
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    }
  }, '.main__gallery');
  section.renderItems();

  const popupEditProfile = new PopupWithForm('#popupEdit', (formData) => {
    userInfo.setUserInfo(formData);
    popupEditProfile.close();
  });
  popupEditProfile.setEventListeners();

  document.querySelector('.main__button_edit').addEventListener('click', () => {
    const currentUser = userInfo.getUserInfo();
    popupEditProfile.setInputValues(currentUser);
    popupEditProfile.open();
  });

  const popupAddCard = new PopupWithForm('#popupAdd', (formData) => {
    const newCard = createCard({ name: formData['title-input'], link: formData['url-input'] });
    section.addItem(newCard);
    popupAddCard.close();
  });
  popupAddCard.setEventListeners();


  document.querySelector('.main__button_add').addEventListener('click', () => {
    popupAddCard.open();
  });


  const formValidators = {};
  document.querySelectorAll('form').forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute('id');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
});
