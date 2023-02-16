"use strict";
if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");
  // Display function
  displayTodoList();
  function displayTodoList() {
    let html = "";
    todoArr
      .filter((todo) => todo.owner === userActive.username)
      .forEach(function (todo) {
        html += `
        <li class = ${todo.isDone ? "checked" : ""}>
        ${todo.task}
        <span class="close">x</span></li>
        `;
      });
    todoList.innerHTML = html;
    toggleTasks();
    deleteTasks();
  }
  // Add Task
  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim().length === 0) {
      alert("Vui long nhap");
    } else {
      const todo = new Task(inputTask.value, userActive.username, false);
      todoArr.push(todo);
      saveToStorage("todoArr", todoArr);
      displayTodoList();
      inputTask.value = "";
    }
  });
  // Toggle Tasks
  function toggleTasks() {
    document.querySelectorAll("#todo-list li").forEach(function (liEl, idx) {
      liEl.addEventListener("click", function (e) {
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
        }
        //Save in storage
        const currentArr = todoArr.filter(
          (todo) => todo.owner === userActive.username
        );
        currentArr[idx].isDone = liEl.classList.contains("checked")
          ? true
          : false;
        saveToStorage("todoArr", todoArr);
      });
    });
  }
  // Delete Tasks
  function deleteTasks() {
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        // console.log(closeEl.parentElement.innerText.slice(0, -1).length);
        const index = todoArr.findIndex(
          (item) =>
            item.owner === userActive.username &&
            item.task === closeEl.parentElement.innerText.slice(0, -2)
        );
        todoArr.splice(index, 1);

        saveToStorage("todoArr", todoArr);

        displayTodoList();
      });
    });
  }
} else {
  alert("Vui long dang nhap de truy cap ung dung");
  window.location.assign("../index.html");
}
