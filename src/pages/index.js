import { validationConfig, initialCards } from "../constants/utils.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/Popup.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

// ---- Selectores
const profileEditButton = document.querySelector(".main__button_edit");
const cardAddButton    = document.querySelector(".main__button_add");
const avatarImgEl      = document.querySelector(".main__profile-image");
const avatarEditBtn    = document.querySelector(".avatar-edit-btn");

// ---- UserInfo
const userInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about",
  avatarSelector: ".main__profile-image"
});

// ---- Popups
const popupImage = new PopupWithImage(".popup_image");
popupImage.setEventListeners();

const confirmPopup = new PopupWithConfirmation(".popup_type_confirm");
confirmPopup.setEventListeners();

// --- Editar perfil ---
const popupEditProfile = new PopupWithForm("#popupEdit", (formData, submitBtn) => {
  const original = submitBtn?.textContent || "Guardar";
  if (submitBtn) submitBtn.textContent = "Guardando...";
  console.log("[Editar perfil] formData:", formData);

  api.updateUserInfo({ name: formData.name, about: formData.about })
    .then((u) => {
      console.log("[Editar perfil] OK respuesta:", u);
      userInfo.setUserInfo({ name: u.name, about: u.about });
      popupEditProfile.close();
    })
    .catch((e) => {
      console.error("[Editar perfil] ERROR:", e);
      const errSpan = document.getElementById("name-input-error");
      if (errSpan) errSpan.textContent = "No se pudo guardar. Verifica el token o intenta de nuevo.";
    })
    .finally(() => { if (submitBtn) submitBtn.textContent = original; });
});
popupEditProfile.setEventListeners();

// --- Nueva imagen (crear tarjeta) ---
const popupAddCard = new PopupWithForm("#popupAdd", (formData, submitBtn) => {
  const original = submitBtn?.textContent || "Crear";
  if (submitBtn) submitBtn.textContent = "Creando...";
  console.log("[Nueva imagen] formData:", formData);

  api.addNewCard({ name: formData.name, link: formData.link })
    .then((newCard) => {
      console.log("[Nueva imagen] OK respuesta:", newCard);
      section.addItem(createCard(newCard));
      popupAddCard.close();
    })
    .catch((e) => {
      console.error("[Nueva imagen] ERROR:", e);
      const errSpan = document.getElementById("url-input-error");
      if (errSpan) errSpan.textContent = "No se pudo crear la tarjeta. Revisa el enlace o tu token.";
    })
    .finally(() => { if (submitBtn) submitBtn.textContent = original; });
});
popupAddCard.setEventListeners();

// --- Cambiar avatar ---
const popupAvatar = new PopupWithForm("#popupAvatar", (formData, submitBtn) => {
  const original = submitBtn?.textContent || "Guardar";
  if (submitBtn) submitBtn.textContent = "Guardando...";
  console.log("[Cambiar avatar] formData:", formData);

  api.updateAvatar(formData.avatar)
    .then((u) => {
      console.log("[Cambiar avatar] OK respuesta:", u);
      userInfo.setAvatar(u.avatar);
      popupAvatar.close();
    })
    .catch((e) => console.error("[Cambiar avatar] ERROR:", e))
    .finally(() => { if (submitBtn) submitBtn.textContent = original; });
});
popupAvatar.setEventListeners();

// Abrir popup de avatar
(avatarEditBtn || avatarImgEl).addEventListener("click", () => popupAvatar.open());

// ---- Crear tarjeta
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

// ---- Section
const section = new Section(
  { renderer: (cardData) => section.addItem(createCard(cardData)) },
  ".main__gallery"
);

// ---- Listeners de botones
profileEditButton.addEventListener("click", () => {
  const current = userInfo.getUserInfo();
  popupEditProfile.setInputValues({ name: current.name, about: current.about });
  popupEditProfile.open();
});
cardAddButton.addEventListener("click", () => popupAddCard.open());

// ---- Validación
const profileFormEl = document.querySelector("#popupEdit .popup__content");
const addCardFormEl = document.querySelector("#popupAdd .popup__content");
const avatarFormEl  = document.querySelector("#popupAvatar .popup__content");

new FormValidator(validationConfig, profileFormEl).enableValidation();
new FormValidator(validationConfig, addCardFormEl).enableValidation();
new FormValidator(validationConfig, avatarFormEl).enableValidation();

// ---- Inicialización
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([u, cards]) => {
    userInfo.setUserInfo({ name: u.name, about: u.about });
    if (u.avatar) userInfo.setAvatar(u.avatar);
    section.renderItems(Array.isArray(cards) ? cards : initialCards);
  })
  .catch((err) => console.error("Error inicializando datos:", err));
