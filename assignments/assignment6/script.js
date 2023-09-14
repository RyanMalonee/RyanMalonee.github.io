const showImage = () => {
  document.getElementById("image").classList.remove("hide");
}

const hideImage = () => {
  document.getElementById("image").classList.add("hide");
}

const addComment = () => {
  const pName = document.getElementById("product-name").value;
  const comment = document.getElementById("comment").value;
  const rating = document.getElementById("rating").value;
  const userName = document.getElementById("user-name").value;
  
  // Creates a div with the comment-box class, and adds the information from the constants above
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment-box");
  commentDiv.innerHTML = '<h3>' + pName + '</h3> <br> <p>' + rating +' ' + rating + ' ' + comment + ' </p> <br> <p> by ' + userName + ' </p>';

  // Adds the commentDiv to the comment-section section
  const commentSection = document.getElementById("comment-section");
  commentSection.appendChild(commentDiv);
}

window.onload = () => {
  document.getElementById("button-show").onclick = showImage;
  document.getElementById("button-hide").onclick = hideImage;
  document.getElementById("button-comment").onclick = addComment;
}