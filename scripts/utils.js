// utils.js

// Configuración para la validación de formularios
export const validationConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  };
  
  // Tarjetas iniciales (opcional, si usas precargadas)
  export const initialCards = [
    {
      name: 'Montañas',
      link: 'https://example.com/montanas.jpg'
    },
    {
      name: 'Playa',
      link: 'https://example.com/playa.jpg'
    },
    {
      name: 'Bosque',
      link: 'https://example.com/bosque.jpg'
    }
  ];
  