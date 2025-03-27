document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector(".popup");
    const editButton = document.querySelector(".main_button_edit");
    const closeButton = document.querySelector(".popup_button_close");

    editButton.addEventListener("click", function () {
        popup.style.display = "block";
    });

    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
    }); 
});
