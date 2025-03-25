const butEdit = document.querySelector(".main__button_edit");
const butAdd = document.querySelector(".main__button_add");
const butClose = document.querySelector(".popup__button_close");
const popButSave = document.querySelector(".popup__button_save");
const popButAdd = document.querySelector(".popup__button_add");
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__container");
const popimg = document.querySelector(".popup__images");
const gallery = document.querySelector(".main__gallery");
const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_about");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
const title = document.querySelector(".popup__subtitle");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/valle-yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "./images/lago-louise.png",
  },
  {
    name: "Montañas Calvas",
    link: "./images/montañas-calvas.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanois National Park",
    link: "./images/vanois-national-park.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago-braies.png",
  },
];

function openEditAdd(e) {
  const butClass = e.target.classList;
  if (butClass.contains("main__button_edit")) {
    inpName.value = inName.textContent;
    inpAbout.value = inAbout.textContent;
    title.textContent = "Editar perfil";
    inpName.placeholder = "Nombre";
    inpAbout.placeholder = "Acerca de mi";
    popup.classList.toggle("popup_opened");
    popButSave.style.display = "block";
    popButAdd.style.display = "none";
    popimg.style.display = "none";
  } else if (butClass.contains("main__button_add")) {
    inpName.value = "";
    inpAbout.value = "";
    title.textContent = "Nuevo lugar";
    inpName.placeholder = "Título";
    inpAbout.placeholder = "Enlace a la imagen";
    popup.classList.toggle("popup_opened");
    popButSave.style.display = "none";
    popButAdd.style.display = "block";
    popimg.style.display = "none";
    inpName.addEventListener("input", validarCampos);
    inpAbout.addEventListener("input", validarCampos);
    validarCampos();
  }
}

function close() {
  popup.classList.toggle("popup_opened");
  popimg.removeAttribute("style");
  form.removeAttribute("style");
}

butEdit.addEventListener("click", openEditAdd);
butClose.addEventListener("click", close);
butAdd.addEventListener("click", openEditAdd);

function saveChangeEdit(e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
  close();
}

form.addEventListener("submit", saveChangeEdit);

function cardsInitials() {
  initialCards.forEach((item) => {
    const cardTemplate = document.querySelector("#main__template").content;
    const cardElement = cardTemplate
      .querySelector(".main__gallery-card")
      .cloneNode(true);
    cardElement.querySelector(".main__gallery-image").src = item.link;
    cardElement.querySelector(".main__gallery-image").alt = item.name;
    cardElement.querySelector(".main__gallery-paragraph").textContent =
      item.name;
    cardElement
      .querySelector(".main__button_like")
      .addEventListener("click", function (e) {
        e.target.classList.toggle("main__button_like_active");
      });
    cardElement
      .querySelector(".main__button_trash")
      .addEventListener("click", function () {
        cardElement.remove();
      });
    cardElement
      .querySelector(".main__gallery-image")
      .addEventListener("click", function () {
        imagePopup(item.name, item.link);
      });
    gallery.append(cardElement);
  });
}
cardsInitials();

function cardsAdd(titleValue, linkValue) {
  const cardTemplate = document.querySelector("#main__template").content;
  const cardElement = cardTemplate
    .querySelector(".main__gallery-card")
    .cloneNode(true);
  cardElement.querySelector(".main__gallery-image").src = linkValue;
  cardElement.querySelector(".main__gallery-image").alt = titleValue;
  cardElement.querySelector(".main__gallery-paragraph").textContent =
    titleValue;
  cardElement
    .querySelector(".main__button_like")
    .addEventListener("click", function (e) {
      e.target.classList.toggle("main__button_like_active");
    });
  cardElement
    .querySelector(".main__button_trash")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  cardElement
    .querySelector(".main__gallery-image")
    .addEventListener("click", function () {
      imagePopup(titleValue, linkValue);
    });
  gallery.prepend(cardElement);
}

function validarCampos() {
  popButAdd.disabled = !(inpName.value && inpAbout.value);
}

popButAdd.addEventListener("click", function () {
  cardsAdd(inpName.value, inpAbout.value);
  close();
});

function imagePopup(name, title) {
  const popimag = popimg.querySelector(".popup__image");
  const poptxt = popimg.querySelector(".popup__paragraph");
  popimag.src = title;
  popimag.alt = name;
  poptxt.textContent = name;
  popup.classList.toggle("popup_opened");
  form.style.display = "none";
}