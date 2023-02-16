"use strict";
// Declare elements
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");
displayHome();
// Display function
function displayHome() {
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${userActive.firstname}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
// Logout Function
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Ban chac chan muon logout");
  if (isLogout) {
    userActive = null;
    saveToStorage("userActive", userActive);
    displayHome();
  }
});
