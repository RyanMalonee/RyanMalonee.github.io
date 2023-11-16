const changeText = () => {
  const helloP = document.getElementById("date");
  helloP.innerHTML = "hi";
  helloP.classList.add("special");
}

const showJasper = () => {
  document.getElementById("image").classList.remove("hide");
}

const hideJasper = () => {
  document.getElementById("image").classList.add("hide");
}


window.onload = () => {
  // get button, tie function to clickage
  document.getElementById("button-click").onclick = changeText;
  document.getElementById("button-show").onclick = showJasper;
  document.getElementById("button-hide").onclick = hideJasper;
}
