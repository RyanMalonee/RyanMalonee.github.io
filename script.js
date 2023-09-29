
const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
}

const switchToAssignments = () => {
  document.getElementById("assignment-section").classList.remove("hide-section");
  document.getElementById("assignments-tab").classList.add("bottom-border");
  document.getElementById("project-section").classList.add("hide-section");
  document.getElementById("project-tab").classList.remove("bottom-border");
}

const switchToProject = () => {
  document.getElementById("assignment-section").classList.add("hide-section");
  document.getElementById("assignments-tab").classList.remove("bottom-border");
  document.getElementById("project-section").classList.remove("hide-section");
  document.getElementById("project-tab").classList.add("bottom-border");
}




window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
  document.getElementById("assignments-tab").onclick = switchToAssignments;
  document.getElementById("project-tab").onclick = switchToProject;
}