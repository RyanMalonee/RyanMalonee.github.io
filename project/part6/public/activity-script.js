// Used to track indexes for the imageBoxContainer
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

// I used the in-class example for the popup images
// and the modal in the background. I tried to make it my
// own in the stylesheet to better suit my needs.
const imageBoxContainer = (activities) => {
  const background = document.getElementById("modal-background");
  const imageContainer = document.getElementById("image-container");
  const iconContainer = document.getElementById("icons");
  const bigImage = document.getElementById("big-image");
  const map = document.getElementById("map");
  const attribution = document.getElementById("attribution");
  document
    .querySelectorAll("#activities-container section:not(.no-background)")
    .forEach((section, index) => {
      section.onclick = () => {
        iconContainer.innerHTML = "";
        const editButton = document.createElement("a");
        editButton.innerHTML = "&#9998; ";
        editButton.classList.add("icon");
        editButton.id = "edit-button";
        iconContainer.append(editButton);

        const deleteButton = document.createElement("a");
        deleteButton.innerHTML = "&#x2715;";
        deleteButton.classList.add("icon");
        deleteButton.id = "delete-button";
        iconContainer.append(deleteButton);
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

        editButton.onclick = (e) => {
          e.preventDefault();
          document.getElementById("new-rec-title").innerHTML = "Edit Activity";
          populateEditFormActivity(activity);
          document.getElementById("x-button").click();
          location.href = "#new-recommendation-form";
        };

        deleteButton.onclick = (e) => {
          e.preventDefault();
          deleteConfirmation(activity);
        };
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
  const iconContainer = document.getElementById("icons");
  const bigImage = document.getElementById("big-image");
  const map = document.getElementById("map");
  const attribution = document.getElementById("attribution");
  document
    .querySelectorAll("#attractions section:not(.no-background)")
    .forEach((section, index) => {
      section.onclick = () => {
        iconContainer.innerHTML = "";
        // Add edit and delete Button
        const editButton = document.createElement("a");
        editButton.innerHTML = "&#9998; ";
        editButton.classList.add("icon");
        editButton.id = "edit-button";
        iconContainer.append(editButton);

        const deleteButton = document.createElement("a");
        deleteButton.innerHTML = "&#x2715;";
        deleteButton.classList.add("icon");
        deleteButton.id = "delete-button";
        iconContainer.append(deleteButton);

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

        editButton.onclick = (e) => {
          e.preventDefault();
          document.getElementById("new-rec-title").innerHTML =
            "Edit Attraction";
          populateEditFormAttraction(attraction);
          document.getElementById("x-button").click();
          location.href = "#new-recommendation-form";
        };

        deleteButton.onclick = (e) => {
          e.preventDefault();
          deleteConfirmation(attraction);
        };
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

// Manages the new recommendation form
const formSubmitMessage = async (e) => {
  e.preventDefault();
  const form = document.getElementById("new-recommendation-form");
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
  const description = document.getElementById("shortDescription").value;
  const longDescription = document.getElementById("long-description").value;

  const data = new FormData(form);
  let response;

  if (form._id.value == -1) {
    data.delete("_id");
    if (type == "Activity") {
      response = await fetch("/api/activities", {
        method: "POST",
        body: data,
      });
    } else {
      response = await fetch("/api/attractions", {
        method: "POST",
        body: data,
      });
    }
  } else {
    if (type == "Activity") {
      response = await fetch(`/api/activities/${form._id.value}`, {
        method: "PUT",
        body: data,
      });
    } else {
      response = await fetch(`/api/attractions/${form._id.value}`, {
        method: "PUT",
        body: data,
      });
    }
  }

  if (response.status != 200) {
    responseMessage.innerHTML = "Sorry, your submission failed.";
    formResultContainer.appendChild(responseMessage);
  } else {
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
  }

  setTimeout(() => {
    formResultContainer.innerHTML = "";
    resetPage();
  }, 1200);
};

const deleteConfirmation = async (activity) => {
  const panel = document.getElementById("delete-confirmation");
  panel.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.innerHTML = `Are you sure you want to delete ${activity.nameOfLocation}?`;
  panel.append(h2);

  const yes = document.createElement("button");
  yes.innerHTML = "Yes";
  panel.append(yes);

  const no = document.createElement("button");
  no.innerHTML = "No";
  panel.append(no);

  panel.classList.remove("hide-image");
  panel.classList.remove("hide");
  panel.classList.add("show-image");

  yes.onclick = () => {
    deleteActivity(activity);
    panel.classList.remove("show-image");
    panel.classList.add("hide-image");
    setTimeout(() => {
      panel.classList.add("hide");
    }, 500);
  };

  no.onclick = () => {
    panel.classList.remove("show-image");
    panel.classList.add("hide-image");
    setTimeout(() => {
      panel.classList.add("hide");
    }, 500);
  };
};

// Deletes activities or Attractions from Database
deleteActivity = async (activity) => {
  if (activity.typeOfLocation == "Activity") {
    await fetch(`/api/activities/${activity._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } else {
    await fetch(`/api/attractions/${activity._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }
  resetPage();
};

// Fetches info from server/db
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

// Shows activity Information/section
const showActivities = async () => {
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

// Activity Navigation
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

// Shows attraction Information/section
const showAttractions = async () => {
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

// Attraction Navigation
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

// Manages the displaying of the summary info
const getActivityItem = (activity) => {
  const section = document.createElement("section");
  section.classList.add("column-split");
  section.index = activities.indexOf(activity);

  if (activity.img) {
    const img = document.createElement("img");
    img.src = activity.img;
    section.append(img);
    if (activity.att) {
      img.setAttribute("att", activity.att);
    }
  }

  const title = document.createElement("p");
  title.classList.add("bold");
  title.innerHTML = activity.nameOfLocation;
  section.append(title);

  const shortDescription = document.createElement("p");
  shortDescription.innerHTML = activity.shortDescription;
  section.append(shortDescription);

  getActivityItemLarge(activity);
  return section;
};

// Manages the information on click of the activity/attraction
const getActivityItemLarge = (activity) => {
  const img = document.getElementById("big-image");
  img.setAttribute("src", activity.img);

  const attribution = document.getElementById("attribution");
  attribution.innerHTML = activity.att;

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

const populateEditFormAttraction = (attraction) => {
  const form = document.getElementById("new-recommendation-form");
  form._id.value = attraction._id;
  form.nameOfLocation.value = attraction.nameOfLocation;
  form.typeOfLocation.value = attraction.typeOfLocation;
  form.longitude.value = attraction.longitude;
  form.latitude.value = attraction.latitude;
  form.address.value = attraction.address;
  form.phone.value = attraction.phone;
  form.email.value = attraction.email;
  form.hoursOpen.value = attraction.hoursOpen;
  form.hoursClose.value = attraction.hoursClose;
  form.review.value = attraction.googleReview;
  form.shortDescription.value = attraction.shortDescription;
  form.longDescription.value = attraction.longDescription;
  form.att.value = attraction.att;
};

const populateEditFormActivity = (activity) => {
  const form = document.getElementById("new-recommendation-form");
  form._id.value = activity._id;
  form.nameOfLocation.value = activity.nameOfLocation;
  form.typeOfLocation.value = activity.typeOfLocation;
  form.longitude.value = activity.longitude;
  form.latitude.value = activity.latitude;
  form.address.value = activity.address;
  form.phone.value = activity.phone;
  form.email.value = activity.email;
  form.openTime.value = activity.hoursOpen;
  form.closeTime.value = activity.hoursClose;
  form.review.value = activity.googleReview;
  form.shortDescription.value = activity.shortDescription;
  form.longDescription.value = activity.longDescription;
  form.att.value = activity.att;
};

const resetForm = () => {
  document.getElementById("new-recommendation-form").reset();
  document.getElementById("new-rec-title").innerHTML = "New Recommendation";
  document.getElementById("new-recommendation-form")._id.value = -1;
};

const resetPage = () => {
  resetForm();
  location.href = "/activities";
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
