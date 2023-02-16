"use strict";
// Check login
if (userActive) {
  // Declare elements
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnsubmit = document.getElementById("btn-submit");
  btnsubmit.addEventListener("click", function () {
    // Validate input
    if (Number(inputPageSize.value) < 1 || Number(inputPageSize.value) > 10) {
      alert("Number không hợp lệ");
    } else {
      // Update userActive data
      userActive.pageSize = Number.parseInt(inputPageSize.value);
      userActive.category = inputCategory.value;
      saveToStorage("userActive", userActive);
      const index = userArr.findIndex(
        (userItem) => userItem.username === userActive.username
      );
      userArr[index] = userActive;
      saveToStorage("userArr", userArr);
      alert("Cài đặt thành công");
      userActive.value = "";
      userActive.value = "General";
    }
  });
} else {
  alert("Vui lòng đăng nhập để truy cập ứng dụng");
  window.location.assign("../index.html");
}
