"use strict";
// Check login
if (userActive) {
  // Declare elements
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");
  let totalResults = 0;
  let keywords = 0;
  navPageNum.style.display = "none";
  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";
    if (inputQuery.value.trim().length === 0) {
      navPageNum.style.display = "none";
      alert("Vui lòng nhập keywords để tìm kiếm");
    } else {
      keywords = inputQuery.value;
      getDataNewsByKeywords(keywords, 1);
    }
  });
  // Get data call API
  async function getDataNewsByKeywords(keywords, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=79ff1f66586247e59c324a0e84036d77`
      );
      const data = await res.json();
      // Check loi qua 100 lan / 1 ngay
      if (data.status === "error" && data.code === "rateLimited") {
        navPageNum.style.display = "none";
        throw new Error(data.message);
      }
      // Neu ko co bai viet nao thi thong bao
      if (data.totalResults == 0) {
        navPageNum.style.display = "none";
        throw new Error("Không có từ khóa hợp lệ");
      }
      // Check loi tep tin khong qua server
      if (data.code == "corsNotAllowed") {
        throw new Error(data.message);
      }
      navPageNum.style.display = "block";
      displayNewList(data);
    } catch (err) {
      alert("err.message");
    }
  }
  // Add event to button
  btnPrev.addEventListener("click", function () {
    getDataNews(keywords, --pageNum.textContent);
  });

  btnNext.addEventListener("click", function () {
    getDataNews(keywords, ++pageNum.textContent);
  });
  // Check display for button function
  function checkBtnPrev() {
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }
  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  // Display data function
  function displayNewList(data) {
    totalResults = data.totalResults;
    checkBtnPrev();
    checkBtnNext();
    let html = "";
    data.articles.forEach(function (article) {
      html += `
    <div>
      <div class ="img-banner">
        <img src= ${
          article.urlToImage ? article.urlToImage : "no_image_available.jpg"
        } width = 30% alt = "img"/>
      </div>
      <div >
        <h4>${article.title}</h4>
        <p>${article.description}</p>
        <button><a href = ${article.url} target = "_blank">View</a></button>
      </div>
    </div>
    `;
    });
    newsContainer.innerHTML = html;
  }
} else {
  alert("Vui lòng đăng nhập để truy cập ứng dụng");
  window.location.assign("../index.html");
}
