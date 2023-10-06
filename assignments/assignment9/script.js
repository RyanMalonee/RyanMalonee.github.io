
const switchQuotes = () => {
  let i = 0;
  const quotes = ["\"You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.\" - John Lennon",
    "\"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.\" - Oprah Winfrey",
    "\"The only thing we have to fear is fear itself.\" - Franklin D. Roosevelt",
    "\"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.\" - Helen Keller",
    "\"Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.\" - Martin Luther King Jr."]

  const quoteContainer = document.getElementById("quote-container");
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
  const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  const rainbowContainer = document.getElementById("rainbow-container");
  rainbowContainer.innerHTML = "";
  document.getElementById("pot-of-gold").classList.add("hide");
  let i = 0;
    const drawRow = () => {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = "hi";
      rainbowContainer.appendChild(paragraph);
      paragraph.style.backgroundColor = colors[i];
      i++
      // I used recursion until all rows are drawn - when all rows are drawn,
      // the pot of gold is shown.
      if(i < colors.length) {
        setTimeout(drawRow, 1000);
      } else {
        setTimeout(() => {
          document.getElementById("pot-of-gold").classList.remove("hide");
        }, 1000);
      }
    }
    drawRow();
}

window.onload = () => {
  document.getElementById("rainbow-button").onclick = buildRainbow;
  switchQuotes();
}
