document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector(".popup");
    const editButton = document.querySelector(".main__button_edit");
    const closeButton = document.querySelector(".popup__button_close");

    
    editButton.addEventListener("click", function () {
        popup.style.display = "block";
    });


    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
    });
});

