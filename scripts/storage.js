"use strict";
// Get data function
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Save data function
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Lấy dữ liệu userArr từ LocalStorage
const users = getFromStorage("userArr") || [];

// Chuyển đổi về dạng Class Instance
const userArr = users.map((user) => parseUser(user));
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lasttname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );
  return user;
}
// Lấy dữ liệu user đang đăng nhập
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;
// Chuyển dữ liệu todoArr từ LocalStorage
const todos = getFromStorage("todoArr") || [];
// Chuyển đổi về dạng Class Instance
const todoArr = todos.map((todo) => parseTask(todo));
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
