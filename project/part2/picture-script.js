// I used the in-class example for the popup images
// and the modal in the background. I tried to make it my
// own in the stylesheet to better suit my needs.
const imageBoxContainer = () => {
  const background = document.getElementById("modal-background");
  const imageContainer = document.getElementById("image-container");
  const bigImage = document.getElementById("big-image");
  document.querySelectorAll("main img").forEach((img) => {
    img.onclick = () => {
      bigImage.src = img.getAttribute("large-src");
      background.classList.remove("hide");
      imageContainer.classList.add("show-image");

      imageContainer.addEventListener("animationend", () => {
        imageContainer.classList.remove("show-image");
        imageContainer.style.opacity = 1;
      });
    };
  });

  document.querySelector(".x-button").onclick = () => {
    background.classList.add("hide");
    imageContainer.style.opacity = 0;
  }

  window.onclick = (event) => {
    if(event.target == background) {
      background.classList.add("hide");
      imageContainer.style.opacity = 0;
    }
  }
}

const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
}

window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
  imageBoxContainer();
}