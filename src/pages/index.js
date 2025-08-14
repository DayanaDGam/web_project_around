import { validationConfig, initialCards } from "../constants/utils.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/Popup.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

const profileEditButton = document.querySelector(".main__button_edit");
const cardAddButton    = document.querySelector(".main__button_add");
const avatarImgEl      = document.querySelector(".main__profile-image");
const avatarEditBtn    = document.querySelector(".avatar-edit-btn");

const userInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about",
  avatarSelector: ".main__profile-image"
});

const popupImage = new PopupWithImage(".popup_image");
popupImage.setEventListeners();

const confirmPopup = new PopupWithConfirmation(".popup_type_confirm");
confirmPopup.setEventListeners();

const popupEditProfile = new PopupWithForm(
  "#popupEdit",
  (formData) => {
    popupEditProfile.setLoading(true);
    api.updateUserInfo({ name: formData.name, about: formData.about })
      .then((u) => {
        userInfo.setUserInfo({ name: u.name, about: u.about });
        popupEditProfile.close();
      })
      .catch((e) => {
        console.error("[Editar perfil] ERROR:", e);
        const errSpan = document.getElementById("name-input-error");
        if (errSpan) errSpan.textContent = "No se pudo guardar. Verifica el token o intenta de nuevo.";
      })
      .finally(() => popupEditProfile.setLoading(false));
  },
  { loadingText: "Guardando..." }
);
popupEditProfile.setEventListeners();


const popupAddCard = new PopupWithForm(
  "#popupAdd",
  (formData) => {
    popupAddCard.setLoading(true);
    api.addNewCard({ name: formData.name, link: formData.link })
      .then((newCard) => {
        section.addItem(createCard(newCard));
        popupAddCard.close();
      })
      .catch((e) => {
        console.error("[Nueva imagen] ERROR:", e);
        const errSpan = document.getElementById("url-input-error");
        if (errSpan) errSpan.textContent = "No se pudo crear la tarjeta. Revisa el enlace o tu token.";
      })
      .finally(() => popupAddCard.setLoading(false));
  },
  { loadingText: "Creando..." }
);
popupAddCard.setEventListeners();

const popupAvatar = new PopupWithForm(
  "#popupAvatar",
  (formData) => {
    popupAvatar.setLoading(true);
    api.updateAvatar(formData.avatar)
      .then((u) => {
        userInfo.setAvatar(u.avatar);
        popupAvatar.close();
      })
      .catch((e) => {
        console.error("[Cambiar avatar] ERROR:", e);
        const errSpan = document.getElementById("avatar-input-error");
        if (errSpan) errSpan.textContent = "No se pudo actualizar el avatar. Verifica el enlace o tu token.";
      })
      .finally(() => popupAvatar.setLoading(false));
  },
  { loadingText: "Guardando..." }
);
popupAvatar.setEventListeners();

function createCard(data) {
  const card = new Card(
    data,
    "#main__template",
    (name, link) => popupImage.open(name, link),
    (cardEl) => {
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(data._id)
          .then(() => { cardEl.remove(); confirmPopup.close(); })
          .catch((e) => console.error("Error eliminando tarjeta:", e));
      });
      confirmPopup.open();
    }
  );
  return card.generateCard();
}

const section = new Section(
  {
    renderer: (cardData) => {
      const el = createCard(cardData);
      section.addItem(el, { append: true });
    }
  },
  ".main__gallery"
);
profileEditButton.addEventListener("click", () => {
  const current = userInfo.getUserInfo();
  popupEditProfile.setInputValues({ name: current.name, about: current.about });
  popupEditProfile.open();
});
cardAddButton.addEventListener("click", () => popupAddCard.open());

(avatarEditBtn || avatarImgEl).addEventListener("click", () => popupAvatar.open());

const profileFormEl = document.querySelector("#popupEdit .popup__content");
const addCardFormEl = document.querySelector("#popupAdd .popup__content");
const avatarFormEl  = document.querySelector("#popupAvatar .popup__content");

new FormValidator(validationConfig, profileFormEl).enableValidation();
new FormValidator(validationConfig, addCardFormEl).enableValidation();
new FormValidator(validationConfig, avatarFormEl).enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([u, cards]) => {
    userInfo.setUserInfo({ name: u.name, about: u.about });
    if (u.avatar) userInfo.setAvatar(u.avatar);
    section.renderItems(Array.isArray(cards) ? cards : initialCards);
  })
  .catch((err) => console.error("Error inicializando datos:", err));
