
const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
}

const sortAge = () => {
  const age1 = parseInt(document.getElementById("age1").value);
  const age2 = parseInt(document.getElementById("age2").value);
  const age3 = parseInt(document.getElementById("age3").value);
  const name1 = document.getElementById("name1").value;
  const name2 = document.getElementById("name2").value;
  const name3 = document.getElementById("name3").value;
  let results = "Oldest to youngest: ";
  /* Checks for errors and displays error message if there is one
     If there are no errors, it will compare each age and order the
     names from oldest to youngest
     - Found isNaN() on w3schools.com to check if empty input was entered */
  if(isNaN(age1) || isNaN(age2) || isNaN(age3) || age1 < 0
    || age2 < 0 || age3 < 0 || name1 == "" || name2 == ""
    || name3 == "") {
    results += "Invalid Information"
  } else if (age1 >= age2 && age1 >= age3) {
    results += name1 + ", ";
    if (age2 >= age3) {
      results += name2 + ", " + name3;
    } else {
      results += name3 + ", " + name2;
    }
  } else if (age2 >= age1 && age2 >= age3) {
    results += name2 + ", ";
    if (age1 >= age3) {
      results += name1 + ", " + name3;
    } else {
      results += name3 + ", " + name1;
    }
  } else {
    results += name3 + ", ";
    if (age1 >= age2) {
      results += name1 + ", " + name2;
    } else {
      results += name2 + ", " + name1;
    }
  }
  document.getElementById("oldest-result").innerHTML = "<p> " + results + "</p>";
}

const fundraisingGoal = () => {
  const goal = 10000;
  const raised = parseInt(document.getElementById("money-raised").value);
  const root = document.querySelector(":root");
  // Found isNaN() on w3schools.com to check if an empty input was entered
  if(isNaN(raised) || raised < 0) {
    root.style.setProperty("--num", "0%");
  } else if(raised/goal < .5) {
    root.style.setProperty("--num", "25%");
  } else if(raised/goal >= .5 && raised/goal < .75) {
    root.style.setProperty("--num", "50%");
  } else if(raised/goal >= .75 && raised/goal < 1) {
    root.style.setProperty("--num", "75%");
  } else {
    root.style.setProperty("--num", "100%");
  }
}

const switchExerciseTo1 = () => {
  document.getElementById("oldest-form").classList.remove("hide-exercise");
  document.getElementById("exercise1").classList.add("bottom-border");
  document.getElementById("fund-raising").classList.add("hide-exercise");
  document.getElementById("exercise2").classList.remove("bottom-border");
}

const switchExerciseTo2 = () => {
  document.getElementById("oldest-form").classList.add("hide-exercise");
  document.getElementById("exercise1").classList.remove("bottom-border");
  document.getElementById("fund-raising").classList.remove("hide-exercise");
  document.getElementById("exercise2").classList.add("bottom-border");
}

window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
  document.getElementById("compare-ages").onclick = sortAge;
  document.getElementById("exercise1").onclick = switchExerciseTo1;
  document.getElementById("exercise2").onclick = switchExerciseTo2;
  document.getElementById("fund-raising-button").onclick = fundraisingGoal;
}