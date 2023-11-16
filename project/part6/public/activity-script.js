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
    .querySelectorAll("#activities-container section:not(.no-background)")
    .forEach((section, index) => {
      section.onclick = () => {
        // to calculate the offset from the adding and removing of sections
        const activityIndex =
          (index + imageIndex + activities.length) % activities.length;
        const activity = activities[activityIndex];
        getActivityItemLarge(activity);

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

const imageBoxContainerAttraction = (attractions) => {
  const background = document.getElementById("modal-background");
  const imageContainer = document.getElementById("image-container");
  const bigImage = document.getElementById("big-image");
  const map = document.getElementById("map");
  const attribution = document.getElementById("attribution");
  document
    .querySelectorAll("#attractions section:not(.no-background)")
    .forEach((section, index) => {
      section.onclick = () => {
        // to calculate the offset from the adding and removing of sections
        const attractionIndex =
          (index + attractionImageIndex + attractions.length) %
          attractions.length;
        const attraction = attractions[attractionIndex];
        getActivityItemLarge(attraction);

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

const formSubmitMessage = async (e) => {
  e.preventDefault();
  const formResultContainer = document.getElementById(
    "new-recommendation-results"
  );
  const responseMessage = document.createElement("p");
  formResultContainer.innerHTML = "";

  const name = document.getElementById("name-of-location").value;
  const type = document.getElementById("type-of-location").value;
  const longitude = document.getElementById("longitude").value;
  const latitude = document.getElementById("latitude").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const openTime = document.getElementById("open-time").value;
  const closeTime = document.getElementById("close-time").value;
  const review = document.getElementById("review").value;
  const description = document.getElementById("description").value;
  const longDescription = document.getElementById("long-description").value;

  responseMessage.innerHTML = `<div id="new-rec-result-container"> <h3>Thank you for your submission!</h3> <h4>Information:</h4>
  <div class=flex-container> <section class="column-split">
  <p>Name: ${name}</p>
  <p>Type: ${type}</p>
  <p>Longitude: ${longitude}</p>
  <p>Latitude: ${latitude}</p>
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
  <p>Long Description: ${longDescription}</p>
  </section>
  </div></div>`;
  formResultContainer.appendChild(responseMessage);

  /* -- SAVED FOR WRITING TO JSON -- */

  /*
  const formData = {
    previewImg: "https://place-hold.it/200x150",
    largeImg: "https://place-hold.it/600x400",
    attribution: null,
    nameOfLocation: name,
    typeOfLocation: type,
    longitude: longitude,
    latitude: latitude,
    phone: phone,
    email: email,
    hoursOpen: openTime,
    hoursClose: closeTime,
    address: address,
    googleReview: review,
    shortDescription: description,
    longDescription: longDescription,
  };

  let existingData = [];
  if (type == "activity") {
    existingData = await getActivities();
  } else {
    existingData = await getAttractions();
  }
  existingData.push(formData);
  await writeToJSON(existingData);
  showActivities();
  showAttractions();
  */
};

/* const getActivities = async () => {
  const url = "json/activities.json";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}; */

/*const getAttractions = async () => {
  const url = "json/attractions.json";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};*/

const getActivities = async () => {
  try {
    const response = await fetch("api/activities");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAttractions = async () => {
  try {
    const response = await fetch("api/attractions");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

let activities = [];
let attractions = [];
let attractionSectionsAdded = 0;
let activitySectionsAdded = 0;
let backwardsIndex = 0;
let forwardsIndex = 4;
let imageIndex = 0;
let attractionForwardsIndex = 4;
let attractionBackwardsIndex = 0;
let attractionImageIndex = 0;

// Activity Information/section
const showActivities = async () => {
  sectionsAdded = 0;
  activities = await getActivities();
  const activityContainer = document.getElementById("activities-container");
  for (let i = 0; i < activities.length && activitySectionsAdded < 5; i++) {
    const activity = activities[i];
    activityContainer.insertBefore(
      getActivityItem(activity),
      activityContainer.lastElementChild
    );
    activitySectionsAdded++;
  }
  imageBoxContainer(activities);
};

document.getElementById("activity-forwards-arrow").onclick = () => {
  const activityContainer = document.getElementById("activities-container");
  if (activities.length > 5) {
    forwardsIndex++;
    backwardsIndex++;
    if (forwardsIndex > activities.length - 1) {
      forwardsIndex = 0;
    }
    if (backwardsIndex > activities.length - 1) {
      backwardsIndex = 0;
    }
    const firstActivity = activityContainer.children[1];
    const activity = activities[forwardsIndex];
    activityContainer.insertBefore(
      getActivityItem(activity),
      activityContainer.lastElementChild
    );
    imageIndex++;
    if (imageIndex > activities.length - 1) {
      imageIndex = 0;
    }
    activityContainer.removeChild(firstActivity);
  }
  imageBoxContainer(activities);
};

document.getElementById("activity-backwards-arrow").onclick = () => {
  const activityContainer = document.getElementById("activities-container");
  if (activities.length > 5) {
    forwardsIndex--;
    backwardsIndex--;
    if (backwardsIndex < 0) {
      backwardsIndex = activities.length - 1;
    }
    if (forwardsIndex < 0) {
      forwardsIndex = activities.length - 1;
    }

    const lastActivity = activityContainer.children[5];
    const activity = activities[backwardsIndex];

    activityContainer.insertBefore(
      getActivityItem(activity),
      activityContainer.children[1]
    );
    imageIndex = backwardsIndex + 1;
    if (imageIndex < 0) {
      imageIndex = activities.length - 1;
    }
    activityContainer.removeChild(lastActivity);
  }
  imageIndex--;
  if (imageIndex < 0) {
    imageIndex = activities.length - 1;
  }
  imageBoxContainer(activities);
};

// Attraction Information/section
const showAttractions = async () => {
  sectionsAdded = 0;
  attractions = await getAttractions();
  const attractionContainer = document.getElementById("attractions");
  for (let i = 0; i < attractions.length && attractionSectionsAdded < 5; i++) {
    const attraction = attractions[i];
    attractionContainer.insertBefore(
      getActivityItem(attraction),
      attractionContainer.lastElementChild
    );
    attractionSectionsAdded++;
  }
  imageBoxContainerAttraction(attractions);
};

document.getElementById("forwards-arrow").onclick = () => {
  const attractionContainer = document.getElementById("attractions");
  if (attractions.length > 5) {
    attractionForwardsIndex++;
    attractionBackwardsIndex++;
    if (attractionForwardsIndex > attractions.length - 1) {
      attractionForwardsIndex = 0;
    }
    if (attractionBackwardsIndex > attractions.length - 1) {
      attractionBackwardsIndex = 0;
    }
    const firstAttraction = attractionContainer.children[1];
    const attraction = attractions[attractionForwardsIndex];

    attractionContainer.insertBefore(
      getActivityItem(attraction),
      attractionContainer.lastElementChild
    );
    attractionImageIndex++;
    if (attractionImageIndex > attractions.length - 1) {
      attractionImageIndex = 0;
    }
    attractionContainer.removeChild(firstAttraction);
  }
  if (attractionImageIndex > attractions.length - 1) {
    attractionImageIndex = 0;
  }
  imageBoxContainerAttraction(attractions);
};

document.getElementById("backwards-arrow").onclick = () => {
  const attractionContainer = document.getElementById("attractions");
  if (attractions.length > 5) {
    attractionForwardsIndex--;
    attractionBackwardsIndex--;
    if (attractionBackwardsIndex < 0) {
      attractionBackwardsIndex = attractions.length - 1;
    }
    if (attractionForwardsIndex < 0) {
      attractionForwardsIndex = attractions.length - 1;
    }

    const lastAttraction = attractionContainer.children[5];
    const attraction = attractions[attractionBackwardsIndex];
    console.log(attraction);

    attractionContainer.insertBefore(
      getActivityItem(attraction),
      attractionContainer.children[1]
    );
    attractionImageIndex = attractionBackwardsIndex + 1;
    if (attractionImageIndex < 0) {
      attractionImageIndex = attractions.length - 1;
    }
    attractionContainer.removeChild(lastAttraction);

    attractionImageIndex--;
    if (attractionImageIndex < 0) {
      attractionImageIndex = attractions.length - 1;
    }
    imageBoxContainerAttraction(attractions);
  }
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

  const phone = document.getElementById("phone-info");
  if (activity.phone != "" && activity.phone != null) {
    phone.innerHTML = `Phone Number: ${activity.phone}`;
  } else {
    phone.innerHTML = "";
  }

  const email = document.getElementById("email-info");
  if (activity.email != "" && activity.email != null) {
    email.innerHTML = `Email Address: ${activity.email}`;
  } else {
    email.innerHTML = "";
  }

  const address = document.getElementById("address-info");
  address.innerHTML = `Address: ${activity.address}`;

  const review = document.getElementById("review-info");
  if (activity.googleReview != "" && activity.googleReview != null) {
    review.innerHTML = `Review: ${activity.googleReview} / 5 Stars`;
  } else {
    review.innerHTML = "";
  }
};

const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
};

window.onload = () => {
  document.getElementById("hamburger").onclick = toggleHamburger;
  showActivities();
  showAttractions();
  document.getElementById("new-recommendation-form").onsubmit =
    formSubmitMessage;
};
