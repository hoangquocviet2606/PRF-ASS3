"use strict";
if (userActive) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnsubmit = document.getElementById("btn-submit");
  btnsubmit.addEventListener("click", function () {
    if (validate) {
      // Update userActive
      userActive.pageSize = Number.parseInt(inputPageSize.value);
      userActive.category = inputCategory.value;
      saveToStorage("userActive", userActive);
      // Update userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === userActive.username
      );
      userArr[index] = userActive;
      saveToStorage("userArr", userArr);
      alert("cai dat thanh cong");
      userActive.value = "";
      userActive.value = "General";
    }
    function validate() {
      if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
        alert("Number khong hop le");
        return false;
      }
      return true;
    }
  });
} else {
  alert("Vui long dang nhap de truy cap ung dung");
  window.location.assign("../index.html");
}
