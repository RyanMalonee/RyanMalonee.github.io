

class Toy {
  constructor(name, price, ageRange, rating, pic) {
    this.name = name;
    this.price = price;
    this.ageRange = ageRange;
    this.rating = rating;
    this.pic = pic;
  }

  get ToyItem() {
    const section = document.createElement("section");
    section.classList.add("column");

    const image = document.createElement("img");
    image.src = "images/" + this.pic;

    section.appendChild(image);

    return section;   
  }

  get ToyDetails() {
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info");

    const text = `<h3>${this.name}</h3> <p class=bold>Price: $${this.price}</p>
    <p>Age Range: ${this.ageRange}</p> <p>Rating: ${this.rating}</p>`;

    infoContainer.innerHTML = text;

    return infoContainer;
  }
}

const showToys = () => {
  const toys = [];
  toys.push(new Toy("Mr. Potato Head", 6.88, "2+", 4.5, "potato-head.png"));
  toys.push(new Toy("Barbie", 29.99, "3+", 4.6, "barbie.png"));
  toys.push(new Toy("Rubik's Cube", 9.99, "8+", 4.7, "cube.png"));
  toys.push(new Toy("Scooter", 49.99, "5+", 4.8, "scooter.png"));
  toys.push(new Toy("Play-Doh", 1.99, "2+", 4.7, "play-doh.png"));
  toys.push(new Toy("Legos", "10.00+", "2+", 5.0, "legos.png"));

  const toysContainer = document.getElementById("toys");

  toys.forEach((toy) => {
    const toyItem = toy.ToyItem;
    toyItem.append(toy.ToyDetails)
    toysContainer.appendChild(toyItem);
  });
}


window.onload = () => {
  showToys();
}