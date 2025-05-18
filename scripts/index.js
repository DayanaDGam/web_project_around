document.addEventListener("DOMContentLoaded", function () {
  const popupEdit = document.querySelectorAll(".popup")[0];
  const editButton = document.querySelector(".main__button_edit");
  const profileName = document.querySelector(".main__paragraph_name");
  const profileAbout = document.querySelector(".main__paragraph_about");
  const inputName = document.querySelector(".popup__input_name");
  const inputAbout = document.querySelector(".popup__input_about");
  const closeButtons = document.querySelectorAll(".popup__button_close");

  const popupAdd = document.querySelectorAll(".popup")[1];
  const addButton = document.querySelector(".main__button_add");
  const inputTitle = document.querySelector(".popup__input_title");
  const inputImage = document.querySelector(".popup__input_image");

  const gallery = document.querySelector(".main__gallery");
  const template = document.querySelector("#main__template");

  const popupImage = document.querySelector(".popup_image");
  const popupImageEl = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");
  const popupImageClose = popupImage.querySelector(".popup__button_close");

  function inicializarTarjetasExistentes() {
    const tarjetas = document.querySelectorAll(".main__gallery-card");

    tarjetas.forEach((card) => {
      const img = card.querySelector(".main__gallery-image");
      const likeBtn = card.querySelector(".main__button_like");
      const trashBtn = card.querySelector(".main__button_trash");

      likeBtn.addEventListener("click", function () {
        this.classList.toggle("main__button_like_active");
        this.style.backgroundImage = this.classList.contains("main__button_like_active")
          ? "url(../images/like-active.jpeg)"
          : "url(../images/like-white.svg)";
      });

      trashBtn.addEventListener("click", function () {
        card.remove();
      });

      img.addEventListener("click", () => {
        popupImageEl.src = img.src;
        popupImageEl.alt = img.alt;
        popupCaption.textContent = img.alt;
        popupImage.classList.add("popup_opened");
      });
    });
  }

  function agregarTarjeta(title, imageUrl) {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector(".main__gallery-card");
    const img = card.querySelector(".main__gallery-image");
    const text = card.querySelector(".main__gallery-paragraph");

    img.src = imageUrl;
    img.alt = title;
    text.textContent = title;

    const likeBtn = card.querySelector(".main__button_like");
    likeBtn.addEventListener("click", function () {
      this.classList.toggle("main__button_like_active");
      this.style.backgroundImage = this.classList.contains("main__button_like_active")
        ? "url(../images/like-active.jpeg)"
        : "url(../images/like-white.svg)";
    });

    const trashBtn = card.querySelector(".main__button_trash");
    trashBtn.addEventListener("click", () => {
      card.remove();
    });

    img.addEventListener("click", () => {
      popupImageEl.src = img.src;
      popupImageEl.alt = img.alt;
      popupCaption.textContent = img.alt;
      popupImage.classList.add("popup_opened");
    });

    gallery.prepend(clone);
  }

  editButton.addEventListener("click", function () {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
    popupEdit.classList.add("popup_opened");
  });

  addButton.addEventListener("click", function () {
    inputTitle.value = "";
    inputImage.value = "";
    popupAdd.classList.add("popup_opened");
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      popupEdit.classList.remove("popup_opened");
      popupAdd.classList.remove("popup_opened");
      popupImage.classList.remove("popup_opened");
    });
  });

  const profileForm = popupEdit.querySelector("form");
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupEdit.classList.remove("popup_opened");
  });

  const cardForm = popupAdd.querySelector("form");
  cardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    agregarTarjeta(inputTitle.value, inputImage.value);
    popupAdd.classList.remove("popup_opened");
  });

  popupImageClose.addEventListener("click", () => {
    popupImage.classList.remove("popup_opened");
  });

  inicializarTarjetasExistentes();
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}
