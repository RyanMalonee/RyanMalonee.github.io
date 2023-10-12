

const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
}

window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
}