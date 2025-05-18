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
});

