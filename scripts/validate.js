
document.addEventListener("DOMContentLoaded", () => {
  // Configuración de validación para formularios
  const formConfigs = [
    {
      formId: "formEdit",
      inputs: [
        { id: "name-input", minLength: 2, maxLength: 40 },
        { id: "about-input", minLength: 2, maxLength: 200 }
      ]
    },
    {
      formId: "formAdd",
      inputs: [
        { id: "title-input", minLength: 2, maxLength: 30 },
        { id: "url-input", type: "url" }
      ]
    }
  ];

  formConfigs.forEach(config => {
    const form = document.getElementById(config.formId);
    const submitButton = form.querySelector("button[type='submit']");

    const checkFormValidity = () => {
      const allValid = config.inputs.every(inputConf => {
        const input = document.getElementById(inputConf.id);
        return input.checkValidity();
      });

      submitButton.disabled = !allValid;
      submitButton.classList.toggle("popup__button_disabled", !allValid);
    };

    config.inputs.forEach(inputConf => {
      const input = document.getElementById(inputConf.id);

      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          input.classList.add("popup__input_type_error");
        } else {
          input.classList.remove("popup__input_type_error");
        }
        checkFormValidity();
      });
    });

    // Al cargar la página
    checkFormValidity();

    // También previene el envío si el formulario no es válido
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        checkFormValidity();
      }
    });
  });
});
