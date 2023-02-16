"use strict";
// Check login
if (userActive) {
  // Declare elements
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");
  let totalResults = 0;
  getDataNews("us", 1);
  // Get data call API
  async function getDataNews(country, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=79ff1f66586247e59c324a0e84036d77`
      );
      const data = await res.json();
      console.log(data);
      // Neu ket noi qua 100 lan / 1 ngay
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }
      // Neu chay tep khong qua 1 local
      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      displayNewList(data);
    } catch (err) {
      alert("Error:" + err.message);
    }
  }
  // Add event to btnPrev
  btnPrev.addEventListener("click", function () {
    getDataNews("us", --pageNum.textContent);
  });
  function checkBtnPrev() {
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }
  // Add event to btnNext
  btnNext.addEventListener("click", function () {
    getDataNews("us", ++pageNum.textContent);
  });
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
