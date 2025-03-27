document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector(".popup");
    const editButton = document.querySelector(".main__button_edit");
    const closeButton = document.querySelector(".popup__button_close");

    
    const profileName = document.querySelector(".main__paragraph_name");
    const profileAbout = document.querySelector(".main__paragraph_about");

    
    const inputName = document.querySelector(".popup__input_name");
    const inputAbout = document.querySelector(".popup__input_about");

    
    editButton.addEventListener("click", function () {
        inputName.value = profileName.textContent; 
        inputAbout.value = profileAbout.textContent; 
        popup.style.display = "block"; 
    });

    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    const saveButton = document.querySelector(".popup__button_save");
    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); 

        profileName.textContent = inputName.value; 
        profileAbout.textContent = inputAbout.value;

        popup.style.display = "none";
    });
});

    const likeButtons = document.querySelectorAll(".main__button_like");
  
    likeButtons.forEach(button => {
      button.addEventListener("click", function () {
        if (this.classList.contains("main__button_like_active")) {
          this.classList.remove("main__button_like_active");
          this.style.backgroundImage = "url(../images/like-white.svg)"; // Imagen blanca
        } else {
          this.classList.add("main__button_like_active");
          this.style.backgroundImage = "url(../images/like-active.jpeg)"; // Imagen negra
        }
      });
    });
  
  

