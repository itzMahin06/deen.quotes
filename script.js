document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupText = document.getElementById("popup-text");
    const closePopup = document.querySelector(".close");
    const shareOptions = document.getElementById("share-options");

    let currentIgLink = ""; // Store the IG link of the clicked image

    document.querySelectorAll(".image-card").forEach(card => {
        card.addEventListener("click", function () {
            popupImg.src = this.querySelector(".gallery-img").src;
            popupText.innerText = this.getAttribute("data-text");
            popup.style.display = "flex";
        });

        card.querySelector(".share-btn").addEventListener("click", function (event) {
            event.stopPropagation(); 
            
            // Get the IG link of the image
            currentIgLink = card.getAttribute("data-ig-link");

            let rect = this.getBoundingClientRect();
            shareOptions.style.display = "block";
            shareOptions.style.top = rect.top - 50 + "px";
            shareOptions.style.left = rect.left + "px";
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

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".share-btn") && !event.target.closest("#share-options")) {
            shareOptions.style.display = "none";
        }
    });

    window.share = function (platform) {
        if (!currentIgLink) return;

        let shareUrl = "";
        if (platform === "facebook") {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentIgLink)}`;
        } else if (platform === "messenger") {
            shareUrl = `fb-messenger://share?link=${encodeURIComponent(currentIgLink)}`;
        } else if (platform === "whatsapp") {
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentIgLink)}`;
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank");
        }

        showAlert();
    };

    window.copyLink = function () {
        if (currentIgLink) {
            navigator.clipboard.writeText(currentIgLink);
            showAlert();
        }
    };

    function showAlert() {
        document.getElementById("alert-box").style.display = "block";
        setTimeout(() => {
            document.getElementById("alert-box").style.display = "none";
        }, 2000);
    }
});

let music = document.getElementById("bgMusic");
    let isPlaying = false;

    // Function to play music with user interaction bypass
    function playMusic() {
        music.play().then(() => {
            isPlaying = true;
        }).catch(error => {
            console.log("Autoplay blocked, waiting for user interaction...");
            document.body.addEventListener("click", playMusic, { once: true });
        });
    }

    // Automatically play music after page loads
    window.addEventListener("load", function () {
        playMusic();
        setTimeout(() => {
            document.getElementById("musicAlert").style.display = "none";
        }, 5000);
    });

    // Double Tap to Toggle Music
    let lastTap = 0;
    document.addEventListener("touchend", function (e) {
        let currentTime = new Date().getTime();
        if (currentTime - lastTap < 300) {
            if (isPlaying) {
                music.pause();
            } else {
                music.play();
            }
            isPlaying = !isPlaying;
        }
        lastTap = currentTime;
    });
