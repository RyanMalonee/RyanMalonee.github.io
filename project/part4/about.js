const displayEmailResults = async (e) => {
    e.preventDefault();
    const emailResults = document.getElementById("email-results");
    const result = document.createElement("p");
    let emailResponse = await getEmailResults();
    if (emailResponse.status == 200) {
        emailResults.innerHTML = "";
        result.innerHTML = "Email Successfully Sent";
        emailResults.appendChild(result);
    } else {
        emailResults.innerHTML = "";
        result.innerHTML = "Sorry, your email was not sent.";
        emailResults.appendChild(result);
    }
    emailResults.appendChild(result);
}

const getEmailResults = async () => {
    const contactForm = document.getElementById("contact-me-form");
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const emailResults = document.getElementById("email-results");
    const result = document.createElement("p");
    result.innerHTML = "Sending...";
    emailResults.appendChild(result);
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    });
    return response;
} catch (error) {
    console.log(error);
    result.innerHTML = "Sorry, your email failed to send.";
}
}


const toggleHamburger = () => {
    document.getElementById("nav-items").classList.toggle("hide");
}

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleHamburger;
    document.getElementById("contact-me-form").onsubmit = displayEmailResults;
}