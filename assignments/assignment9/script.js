
const switchQuotes = () => {
  let i = 0;
  let quotes = ["\"You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.\" -John Lennon",
    "\"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.\" -Oprah Winfrey",
    "\"The only thing we have to fear is fear itself.\" -Franklin D. Roosevelt",
    "\"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.\" -Helen Keller",
    "\"Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.\" -Martin Luther King Jr."]

  let quoteContainer = document.getElementById("quote-container");
  quoteContainer.innerHTML = quotes[0];
  const changeQuote = setInterval(() => {
    if(i < quotes.length - 1) {
      i++;
    } else {
      i = 0;
    }
    quoteContainer.innerHTML = quotes[i]; 
  }, 2000);
    
}

const buildRainbow = () => {
  let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  const rainbowContainer = document.getElementById("rainbow-container");
  let i = 0;
  setTimeout(() => {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = "";
    rainbowContainer.appendChild(paragraph);
    paragraph.style.backgroundColor = colors[i];
    i++
  }, 1000)
}

window.onload = () => {
  document.getElementById("rainbow-button").onclick = buildRainbow;
}
