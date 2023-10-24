// I used the in-class example for the popup images
// and the modal in the background. I tried to make it my
// own in the stylesheet to better suit my needs.
const imageBoxContainer = () => {
  const background = document.getElementById("modal-background");
  const imageContainer = document.getElementById("image-container");
  const bigImage = document.getElementById("big-image");
  const map = document.getElementById("map");
  const attribution = document.getElementById("attribution");
  document.querySelectorAll("main section").forEach((section) => {
    section.onclick = () => {
      const img = section.querySelector("img");
      bigImage.src = img.getAttribute("large-src");
      map.src = img.getAttribute("map-src");
      background.classList.remove("hide");
      imageContainer.classList.add("show-image");
      attribution.innerHTML = img.getAttribute("att");

      imageContainer.addEventListener("animationend", () => {
        imageContainer.classList.remove("show-image");
        imageContainer.style.opacity = 1;
      });
    };
  });

  document.querySelector(".x-button").onclick = () => {
    background.classList.add("hide");
    imageContainer.style.opacity = 0;
  };

  window.onclick = (event) => {
    if (event.target == background) {
      background.classList.add("hide");
      imageContainer.style.opacity = 0;
    }
  };
};

const formSubmitMessage = (e) => {
  e.preventDefault();
  const formResultContainer = document.getElementById(
    "new-recommendation-results"
  );
  const responseMessage = document.createElement("p");
  formResultContainer.innerHTML = "";

  const name = document.getElementById("name-of-location").value;
  const type = document.getElementById("type-of-location").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const openTime = document.getElementById("open-time").value;
  const closeTime = document.getElementById("close-time").value;
  const review = document.getElementById("review").value;
  const description = document.getElementById("description").value;

  responseMessage.innerHTML = `<div id="new-rec-result-container"> <h3>Thank you for your submission!</h3> <h4>Information:</h4>
  <div class=flex-container> <section class="column-split">
  <p>Name: ${name}</p>
  <p>Type: ${type}</p>
  <p>Address: ${address}</p>
  </section>
  <section class="column-split">
  <p>Phone: ${phone}</p>
  <p>Email: ${email}</p>
  <p>Hours of Operation: ${openTime} - ${closeTime}</p>
  </section>
  <section class="column-split">
  <p>Review: ${review}</p>
  <p>Description: ${description}</p>
  </section>
  </div></div>`;
  formResultContainer.appendChild(responseMessage);
};

const getActivities = async () => {
  const url = "json/attractions.json";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const showActivities = async () => {
  const activities = await getActivities();
  const attractionContainer = document.getElementById("attractions");
  const activityList = document.getElementById("activity-list");

  activities.forEach((activity) => {
    if (activity.typeOfLocation == "Attraction") {
      attractionContainer.insertBefore(
        getActivityItem(activity),
        attractionContainer.lastElementChild
      );
    } else {
      activityList.append(getActivityItem(activity));
    }
  });
  imageBoxContainer();
};

const getActivityItem = (activity) => {
  const section = document.createElement("section");
  section.classList.add("column-split");

  const img = document.createElement("img");
  img.src = activity.previewImg;
  img.setAttribute("large-src", activity.largeImg);
  img.setAttribute("att", activity.attribution);
  section.append(img);

  const title = document.createElement("p");
  title.classList.add("bold");
  title.innerHTML = activity.nameOfLocation;
  section.append(title);

  const shortDescription = document.createElement("p");
  shortDescription.innerHTML = activity.shortDescription;
  section.append(shortDescription);

  const map = document.getElementById("map");
  console.log(activity.longitude);
  map.src = `https://maps.google.com/maps?q=${activity.latitude},${activity.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  console.log(section);
  getActivityItemLarge(activity);
  return section;
};

const getActivityItemLarge = (activity) => {
  const longDescription = document.getElementById("long-description-text");
  longDescription.innerHTML = activity.longDescription;
  const map = document.getElementById("map");
  console.log(activity.longitude);
  map.src = `https://maps.google.com/maps?q=${activity.latitude},${activity.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
};

const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
};

window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
  showActivities();
  document.getElementById("new-recommendation-form").onsubmit =
    formSubmitMessage;
};
