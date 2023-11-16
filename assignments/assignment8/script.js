

const moveMan = () => {
  let width = 0;
  const updatePosition = setInterval(() => {
    width += 1;
    document.getElementById("walking-img").style.setProperty("--position", width + "%");
    document.getElementById("running-img").style.setProperty("--position", width + "%");
    if(width >= 70) {
      clearInterval(updatePosition);
    }
  }, 30);

  const changeMan = setInterval(() => {
    document.getElementById("walking-img").classList.toggle("hidden");
    document.getElementById("running-img").classList.toggle("hidden");
    if(width >= 70) {
      clearInterval(changeMan);
    }
  }, 400);
}

const moveThermometer = () => {
  let fill = 0;
  const goal = 10000;
  const raised = parseInt(document.getElementById("money-raised").value);
  const root = document.querySelector(":root");
  
  // Adds a percent to the background every 50 milisecs
  const updateTherm = setInterval(() => {
    if(raised <= 0 || isNaN(raised)) {
      clearInterval(updateTherm);
    } else {
    fill += 1;
    }
    root.style.setProperty("--fill", fill + "%");
    if(fill >= 100 || fill >= raised/goal * 100) {
      clearInterval(updateTherm);
    }
  } , 20);
}


window.onload = () => {
  document.getElementById("walking-img").onclick = moveMan;
  document.getElementById("running-img").onclick = moveMan;
  document.getElementById("fund-raising-button").onclick = moveThermometer;
}