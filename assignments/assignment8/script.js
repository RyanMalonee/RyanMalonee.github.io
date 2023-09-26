

const moveMan = () => {
  let width = 0;
  const updatePosition = setInterval(() => {
    width += 1;
    document.getElementById("walking-img").style.setProperty("--position", width + "%");
    document.getElementById("running-img").style.setProperty("--position", width + "%");
    if(width >= 75) {
      clearInterval(updatePosition);
    }
  }, 10);

  const changeMan = setInterval(() => {
    document.getElementById("walking-img").classList.toggle("hidden");
    document.getElementById("running-img").classList.toggle("hidden");
    if(width >= 75) {
      clearInterval(changeMan);
    }
  }, 190);
}


window.onload = () => {
  document.getElementById("walking-img").onclick = moveMan;
}