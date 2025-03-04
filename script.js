document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupText = document.getElementById("popup-text");
    const closePopup = document.querySelector(".close");
    const shareOptions = document.getElementById("share-options");

    document.querySelectorAll(".image-card").forEach(card => {
        card.addEventListener("click", function () {
            popupImg.src = this.querySelector(".gallery-img").src;
            popupText.innerText = this.getAttribute("data-text");
            popup.style.display = "flex";
        });
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    };

    document.querySelectorAll(".share-btn").forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.stopPropagation(); 
            let rect = this.getBoundingClientRect();

            shareOptions.style.display = "block";
            shareOptions.style.top = rect.top - 50 + "px";
            shareOptions.style.left = rect.left + "px";
        });
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".share-btn") && !event.target.closest("#share-options")) {
            shareOptions.style.display = "none";
        }
    });
});

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    share();
}

function share() {
    document.getElementById("alert-box").style.display = "block";
    setTimeout(() => {
        document.getElementById("alert-box").style.display = "none";
    }, 2000);
}
