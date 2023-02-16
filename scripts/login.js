"use strict";
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSunmit = document.getElementById("btn-submit");

btnSunmit.addEventListener("click", function () {
  const isValidate = validate();
  if (isValidate) {
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    if (user) {
      saveToStorage("userActive", user);
      window.location.assign("../index.html");
    } else {
      alert("vui long kiem tra lai");
    }
  }
});
function validate() {
  if (inputUsername.value === "") {
    alert("Vui long nhap username");
    return false;
  }
  if (inputPassword.value === "") {
    alert("Vui long nhap password");
    return false;
  }
  return true;
}
