// I used the in-class example for the popup images
// and the modal in the background. I tried to make it my
// own in the stylesheet to better suit my needs.
const imageBoxContainer = (activities) => {
  const background = document.getElementById("modal-background");
  const imageContainer = document.getElementById("image-container");
  const bigImage = document.getElementById("big-image");
  const map = document.getElementById("map");
  const attribution = document.getElementById("attribution");
  document
    .querySelectorAll(
      "#activities-container section:not(.no-background), #attractions section:not(.no-background)"
    )
    .forEach((section, index) => {
      section.onclick = () => {
        // to calculate the offset from the adding and removing of sections
        const activityIndex =
          (index + imageIndex + activities.length) % activities.length;
        const activity = activities[activityIndex];
        getActivityItemLarge(activity);

        const img = section.querySelector("img");
        background.classList.remove("hide");
        imageContainer.classList.add("show-image");

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

let activities = [];
let sectionsAdded = 0;
let backwardsIndex = 0;
let forwardsIndex = 4;
let imageIndex = 0;

const showActivities = async () => {
  sectionsAdded = 0;
  activities = await getActivities();
  const attractionContainer = document.getElementById("attractions");
  const activitesContainer = document.getElementById("activities-container");
  for (let i = 0; i < activities.length && sectionsAdded < 5; i++) {
    const activity = activities[i];
    if (activity.typeOfLocation == "Attraction") {
      attractionContainer.insertBefore(
        getActivityItem(activity),
        attractionContainer.lastElementChild
      );
      sectionsAdded++;
    } else {
      activitesContainer.insertBefore(
        getActivityItem(activity),
        activitesContainer.lastElementChild
      );
      sectionsAdded++;
    }
  }

  document.getElementById("forwards-arrow").onclick = () => {
    forwardsIndex++;
    backwardsIndex++;
    if (forwardsIndex > activities.length - 1) {
      forwardsIndex = 0;
    }
    if (backwardsIndex > activities.length - 1) {
      backwardsIndex = 0;
    }
    const firstAttraction = attractionContainer.children[1];
    const firstActivity = activitesContainer.children[1];
    const activity = activities[forwardsIndex];
    if (activity.typeOfLocation == "Attraction") {
      attractionContainer.insertBefore(
        getActivityItem(activity),
        attractionContainer.lastElementChild
      );
      imageIndex++;
      if (imageIndex > activities.length - 1) {
        imageIndex = 0;
      }
      attractionContainer.removeChild(firstAttraction);
    } else {
      activitesContainer.insertBefore(
        getActivityItem(activity),
        activitesContainer.lastElementChild
      );
      imageIndex++;
      if (imageIndex > activities.length - 1) {
        imageIndex = 0;
      }
      activitesContainer.removeChild(firstActivity);
    }
    imageBoxContainer(activities);
  };

  document.getElementById("backwards-arrow").onclick = () => {
    forwardsIndex--;
    backwardsIndex--;
    if (backwardsIndex < 0) {
      backwardsIndex = activities.length - 1;
    }
    if (forwardsIndex < 0) {
      forwardsIndex = activities.length - 1;
    }

    const lastAttraction = attractionContainer.children[5];
    const lastActivity = activitesContainer.children[5];
    const activity = activities[backwardsIndex];

    if (activity.typeOfLocation == "Attraction") {
      attractionContainer.insertBefore(
        getActivityItem(activity),
        attractionContainer.children[1]
      );
      imageIndex--;
      if (imageIndex < 0) {
        imageIndex = activities.length - 1;
      }
      attractionContainer.removeChild(lastAttraction);
    } else {
      activitesContainer.insertBefore(
        getActivityItem(activity),
        activitesContainer.children[1]
      );
      imageIndex--;
      if (imageIndex < 0) {
        imageIndex = activities.length - 1;
      }
      activitesContainer.removeChild(lastActivity);
    }
    imageBoxContainer(activities);
  };

  /*activities.forEach((activity) => {
    if (activity.typeOfLocation == "Attraction") {
      attractionContainer.insertBefore(
        getActivityItem(activity),
        attractionContainer.lastElementChild
      );
    } else {
      activitesContainer.insertBefore(
        getActivityItem(activity),
        activitesContainer.lastElementChild
      );
    }
  });*/
  imageBoxContainer(activities);
};

const getActivityItem = (activity) => {
  const section = document.createElement("section");
  section.classList.add("column-split");
  section.index = activities.indexOf(activity);

  const img = document.createElement("img");
  img.src = activity.previewImg;
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
  map.src = `https://maps.google.com/maps?q=${activity.latitude},${activity.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  getActivityItemLarge(activity);
  return section;
};

const getActivityItemLarge = (activity) => {
  const img = document.getElementById("big-image");
  img.setAttribute("src", activity.largeImg);

  const attribution = document.getElementById("attribution");
  attribution.innerHTML = activity.attribution;

  const longDescription = document.getElementById("long-description-text");
  longDescription.innerHTML = activity.longDescription;

  const map = document.getElementById("map");
  map.src = `https://maps.google.com/maps?q=${activity.latitude},${activity.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const hours = document.getElementById("hours-info");
  hours.innerHTML = `Hours of Operation: ${activity.hoursOpen} - ${activity.hoursClose}`;

  if (activity.phone != "" && activity.phone != null) {
    const phone = document.getElementById("phone-info");
    phone.innerHTML = `Phone Number: ${activity.phone}`;
  }

  if (activity.email != "" && activity.email != null) {
    const email = document.getElementById("email-info");
    email.innerHTML = `Email Address: ${activity.email}`;
  }

  const address = document.getElementById("address-info");
  address.innerHTML = `Address: ${activity.address}`;

  const review = document.getElementById("review-info");
  review.innerHTML = `Review: ${activity.googleReview} / 5 Stars`;
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
