document.addEventListener("DOMContentLoaded", () => {
  const formConfigs = [
    {
      formId: "formEdit",
      popupId: "popupEdit",
      openBtnSelector: ".main__button_edit",
      inputs: [
        { id: "name-input", errorId: "name-error", minLength: 2 },
        { id: "about-input", errorId: "about-error", minLength: 2 }
      ]
    },
    {
      formId: "formAdd",
      popupId: "popupAdd",
      openBtnSelector: ".main__button_add",
      inputs: [
        { id: "title-input", errorId: "title-error", minLength: 2 },
        { id: "url-input", errorId: "url-error", type: "url" }
      ]
    }
  ];

  
  function validateInput(input, errorEl, rules) {
    if (input.validity.valid) {
      errorEl.textContent = "";
      input.classList.remove("popup__input_type_error");
      return;
    }
    
    let message = "";
    if (input.validity.valueMissing) {
      message = "Completa este campo";
    } else if (input.validity.tooShort) {
      message = `Aumenta la longitud de este texto a ${rules.minLength} caracteres o más`;
    } else if (rules.type === "url" && input.validity.typeMismatch) {
      message = "Introduce una URL válida";
    }
    errorEl.textContent = message;
    input.classList.add("popup__input_type_error");
  }

  function checkFormValidity(form, config) {
    const submitButton = form.querySelector("button[type='submit']");
    const allValid = config.inputs.every(conf => {
      const input = form.querySelector(`#${conf.id}`);
      return input.checkValidity();
    });
    submitButton.disabled = !allValid;
    submitButton.classList.toggle("popup__button_disabled", !allValid);
  }

 
  function resetFormValidation(form) {
    form.querySelectorAll(".popup__input").forEach(i => i.classList.remove("popup__input_type_error"));
    form.querySelectorAll(".popup__input-error").forEach(span => span.textContent = "");
    // y ajusta botón
    const cfg = formConfigs.find(c => c.formId === form.id);
    checkFormValidity(form, cfg);
  }

  
  formConfigs.forEach(cfg => {
    const form = document.getElementById(cfg.formId);
    const popup = document.getElementById(cfg.popupId);
    const openBtn = document.querySelector(cfg.openBtnSelector);

 
    if (!form || !popup || !openBtn) return;

    
    cfg.inputs.forEach(rules => {
      const input = form.querySelector(`#${rules.id}`);
      const errorEl = form.querySelector(`#${rules.errorId}`);

      input.addEventListener("input", () => {
        validateInput(input, errorEl, rules);
        checkFormValidity(form, cfg);
      });
    });

   
    form.addEventListener("submit", e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        cfg.inputs.forEach(rules => {
          const input = form.querySelector(`#${rules.id}`);
          const errorEl = form.querySelector(`#${rules.errorId}`);
          validateInput(input, errorEl, rules);
        });
      }
    });

  
    openBtn.addEventListener("click", () => {
      resetFormValidation(form);
      popup.classList.add("popup_opened");
    });
  });

  document.querySelectorAll(".popup").forEach(p => {
    p.addEventListener("mousedown", e => {
      if (e.target === p) p.classList.remove("popup_opened");
    });
  });


  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".popup.popup_opened")
        .forEach(p => p.classList.remove("popup_opened"));
    }
  });
});
