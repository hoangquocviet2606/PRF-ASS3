"use strict";
// Get data function
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Save data function
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Convert userArr from LocalStorage
const users = getFromStorage("userArr") || [];

// Convert userArr to Class Instance
const userArr = users.map((user) => parseUser(user));
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );
  return user;
}
// Get  userActive data
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;
// Convert todoArr from LocalStorage
const todos = getFromStorage("todoArr") || [];
// Convert todoArr to Class Instance
const todoArr = todos.map((todo) => parseTask(todo));
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
