// JavaScript for todo.html

// Get the current day of the week
const currentDayIndex = new Date().getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
const dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][currentDayIndex];

// Get elements for the current day
const todoValue = document.getElementById(dayOfWeek + "-todoText");
const todoAlert = document.getElementById(dayOfWeek + "-Alert");
const listItems = document.getElementById(dayOfWeek + "-list-items");
const addUpdate = document.getElementById(dayOfWeek + "-AddUpdateClick");

// Get todo list from localStorage or create if it doesn't exist
let todoList = JSON.parse(localStorage.getItem(dayOfWeek + "-todo-list"));
if (!todoList) {
    todoList = [];
}

// Function to create todo items
function CreateToDoItems(day) {
    const todoValue = document.getElementById(day + "-todoText");
    const todoAlert = document.getElementById(day + "-Alert");
    const listItems = document.getElementById(day + "-list-items");
    const addUpdate = document.getElementById(day + "-AddUpdateClick");

    if (todoValue.value === "") {
        todoAlert.innerText = "Please enter your todo text!";
        todoValue.focus();
    } else {
        // Check if item already exists
        let isPresent = todoList.some(item => item.item === todoValue.value);
        if (isPresent) {
            setAlertMessage("This item already present in the list!");
            return;
        }

        // Create todo item
        const li = document.createElement("li");
        const todoItems = `<div title="Click to Complete" onclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                        <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/pencil.png" />
                        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/delete.png" /></div></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);

        // Update todoList
        const itemList = { item: todoValue.value, status: false };
        todoList.push(itemList);
        setLocalStorage(day);

        // Reset input field
        todoValue.value = "";
        setAlertMessage("Todo item created successfully!");
    }
}

// Function to read todo items from localStorage
function ReadToDoItems(day) {
    const listItems = document.getElementById(day + "-list-items");

    todoList.forEach((element) => {
        const li = document.createElement("li");
        let style = "";
        if (element.status) {
            style = "style='text-decoration: line-through'";
        }
        const todoItems = `<div ${style} title="Click to Complete" onclick="CompletedToDoItems(this)">${element.item}
        ${style === "" ? "" : '<img class="todo-controls" src="images/check-mark.png" />'}</div><div>
        ${style === "" ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/pencil.png" />' : ""}
        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/delete.png" /></div></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}

// Function to update todo items
function UpdateToDoItems(e) {
    const day = e.id.split("-")[0];
    // Your existing update logic
}

// Function to delete todo items
function DeleteToDoItems(e) {
    const day = e.id.split("-")[0];
    // Your existing delete logic
}

// Function to mark todo items as completed
function CompletedToDoItems(e) {
    const day = e.id.split("-")[0];
    // Your existing completed logic
}

// Function to set localStorage
function setLocalStorage(day) {
    localStorage.setItem(day + "-todo-list", JSON.stringify(todoList));
}

// Function to set alert message
function setAlertMessage(message) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    setTimeout(() => {
        todoAlert.classList.add("toggleMe");
    }, 1000);
}

// Call functions to read todo items and set date
ReadToDoItems(day);
dateTime(); // Assuming you already have dateTime() function defined
