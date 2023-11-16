const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
}

const showPicture = () => {
  console.log("here");
  document.getElementById("picture-container").classList.toggle("hide");
}

window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
  document.getElementById("x-button-pic").onclick = showPicture;
  document.getElementById("s-pic-1").onclick = showPicture;
}