"use strict";
// Declare elements
const inputFirsname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {
  const user = new User(
    inputFirsname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );

  // Check validate
  const isValidate = validate(user);
  if (isValidate) {
    userArr.push(user);
    saveToStorage("userArr", userArr);
    alert("Đăng ký thành công");
    window.location.assign("../pages/login.html");
  }
});
// Validate function
function validate(user) {
  if (user.firstname.trim().length === 0) {
    alert(" Vui lòng nhập First Name");
    return false;
  }
  if (user.lastname.trim().length === 0) {
    alert(" Vui lòng nhập last Name");
    return false;
  }
  if (user.username.trim().length === 0) {
    alert(" Vui lòng nhập user Name");
    return false;
  }
  if (user.password === "") {
    alert(" Vui lòng nhập password");
    return false;
  }
  if (inputPasswordConfirm.value === "") {
    alert(" Vui lòng nhập password");
    return false;
  }
  if (
    !userArr.every((item) => (item.username !== user.username ? true : false))
  ) {
    alert("username đã tồn tại");
    return false;
  }
  if (user.password !== inputPasswordConfirm.value) {
    alert("Password và Confim password phải giống nhau");
    return false;
  }
  if (user.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 ký tự");
    return false;
  }
  return true;
}
