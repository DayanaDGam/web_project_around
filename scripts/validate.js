document.addEventListener("DOMContentLoaded", () => {
  const formConfigs = [
    {
      formId: "formEdit",
      inputs: [
        { id: "name-input", errorId: "name-error", minLength: 2 },
        { id: "about-input", errorId: "about-error", minLength: 2 }
      ]
    },
    {
      formId: "formAdd",
      inputs: [
        { id: "title-input", errorId: "title-error", minLength: 2 },
        { id: "url-input", errorId: "url-error", type: "url" }
      ]
    }
  ];

  formConfigs.forEach(config => {
    const form = document.getElementById(config.formId);
    if (!form) return;

    const submitButton = form.querySelector("button[type='submit']");

    const validateInput = (input, errorEl, rules) => {
      let message = "";
      if (input.validity.valueMissing) {
        message = "Completa este campo";
      } else if (input.validity.tooShort) {
        message = `Aumenta la longitud de este texto a ${rules.minLength} caracteres o más`;
      } else if (rules.type === "url" && input.validity.typeMismatch) {
        message = "Introduce una URL válida";
      }

      errorEl.textContent = message;
      input.classList.toggle("popup__input_type_error", !!message);
    };

    const checkFormValidity = () => {
      const allValid = config.inputs.every(conf => {
        const input = document.getElementById(conf.id);
        return input.checkValidity();
      });

      submitButton.disabled = !allValid;
      submitButton.classList.toggle("popup__button_disabled", !allValid);
    };

    config.inputs.forEach(conf => {
      const input = document.getElementById(conf.id);
      const errorEl = document.getElementById(conf.errorId);

      input.addEventListener("input", () => {
        validateInput(input, errorEl, conf);
        checkFormValidity();
      });
    });

    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        config.inputs.forEach(conf => {
          const input = document.getElementById(conf.id);
          const errorEl = document.getElementById(conf.errorId);
          validateInput(input, errorEl, conf);
        });
      }
    });

    checkFormValidity();
  });

  // Función para limpiar errores al abrir el popup
  function resetFormValidation(formElement) {
    const inputList = formElement.querySelectorAll('.popup__input');
    const errorList = formElement.querySelectorAll('.popup__input-error');
    const submitButton = formElement.querySelector("button[type='submit']");

    inputList.forEach(input => {
      input.classList.remove('popup__input_type_error');
    });

    errorList.forEach(span => {
      span.textContent = '';
    });

    const isValid = formElement.checkValidity();
    submitButton.disabled = !isValid;
    submitButton.classList.toggle('popup__button_disabled', !isValid);
  }

  // Apertura del popup de edición (ajusta IDs según tu HTML)
  const openEditPopupBtn = document.querySelector('.main__button_edit');
  const editPopup = document.querySelector('#popupEdit');
  const editForm = document.getElementById('formEdit');

  openEditPopupBtn.addEventListener('click', () => {
    editPopup.classList.add('popup_opened');
    resetFormValidation(editForm);
  });

  // Apertura del popup de añadir (opcional)
  const openAddPopupBtn = document.querySelector('.main__button_add');
  const addPopup = document.querySelector('#popupAdd');
  const addForm = document.getElementById('formAdd');

  openAddPopupBtn?.addEventListener('click', () => {
    addPopup.classList.add('popup_opened');
    resetFormValidation(addForm);
  });

  // Cerrar el popup al hacer clic fuera
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
      }
    });
  });

  // Cerrar el popup con la tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.popup.popup_opened').forEach(popup => {
        popup.classList.remove('popup_opened');
      });
    }
  });
});
