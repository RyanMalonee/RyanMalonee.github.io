const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
}

const showInfo = () => {
  document.getElementById("activity-container").classList.toggle("hide");
}

window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
  document.getElementById("fun-land").onclick = showInfo;
  document.getElementById("x-button").onclick = showInfo;
}