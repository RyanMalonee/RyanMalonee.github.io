// const add = (a, b) => a+b;

// const add = (a,b) => { return a+b; }

// const square = a => a * a;
// const square = (a) => a * a;

// const helloSpecific = username => console.log("Hello " + username + "!");

// helloSpecific("Ryan");

/* const helloFullName = (firstName, lastName) => {
  console.log("Hello " + firstName + " " + lastName);
  console.log("You are awesome!");
}

helloFullName("Ryan", "Malone");*/

/* Not okay to change a constant
const myName = "Ryan";
myName="Sally"; */

// const myFunct = () => console.log("Hey you!");

const animate = () => {
  document.getElementById("square").classList.add("animate");
}

const showName = () => {
  const firstName = document.getElementById("txt-first-name").value;
  console.log(firstName);
}

window.onload = () => {
  document.getElementById("button").onclick = animate;
  document.getElementById("button-show-name").onclick = showName;
}