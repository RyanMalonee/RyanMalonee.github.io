const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
};

// Used in-class examples along with w3schools.com to help create the slideshow
const slideShow = () => {
  const slideShowContainer = document.getElementById("slideshow-container");
  const slideShowImages = [
    "images/delaware-landscape.jpg",
    "images/delware-sunset.jpeg",
    "images/delaware-landscape3.jpg",
  ];

  let currentImage = 1;
  const changeImage = () => {
    slideShowContainer.style.backgroundImage = `url(${slideShowImages[currentImage]})`;
    console.log(slideShowImages[currentImage]);
    currentImage++;
    if (currentImage >= slideShowImages.length) {
      currentImage = 0;
    }
  };

  const interval = setInterval(() => {
    changeImage();
  }, 4000);
};

window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
  slideShow();
};
