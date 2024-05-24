class ToDoList {
  constructor(listId, alertId, textId, addUpdateId, datetimeId, title) {
    this.listItems = document.getElementById(listId);
    this.todoAlert = document.getElementById(alertId);
    this.todoValue = document.getElementById(textId);
    this.addUpdate = document.getElementById(addUpdateId);
    this.currentDate = this.getTodayDate();
    this.todo = this.readTodoItemsByDate(this.currentDate, listId);
    if (!this.todo) {
      this.todo = [];
    }
    this.init();
    this.createTitleElement(datetimeId, title);
  }

  createTitleElement(datetimeId, title) {
    const datetimeElement = document.getElementById(datetimeId);
    datetimeElement.innerText = title;
  }

  getTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  readTodoItemsByDate(date, listId) {
    const todo = JSON.parse(
      localStorage.getItem(`todo-list-${date}-${listId}`)
    );
    return todo || [];
  }

  setLocalStorageByDate(date, todo, listId) {
    localStorage.setItem(`todo-list-${date}-${listId}`, JSON.stringify(todo));
  }

  init() {
    this.addUpdate.addEventListener("click", () => this.createToDoItems());
    this.readToDoItems();
    this.listItems.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("edit")) {
        this.editTask(target);
      } else if (target.classList.contains("delete")) {
        this.deleteTask(target);
      } else if (target.tagName === "DIV") {
        this.completeTask(target);
      }
    });
  }

  createToDoItems() {
    if (this.todoValue.value === "") {
      this.todoAlert.innerText = "Please enter your todo text!";
      this.todoValue.focus();
    } else {
      let isPresent = false;
      this.todo.forEach((element) => {
        if (element.item === this.todoValue.value) {
          isPresent = true;
        }
      });

      if (isPresent) {
        this.setAlertMessage("This item already present in the list!");
        return;
      }

      let li = document.createElement("li");
      const todoItems = `<div title="Click to Complete">${this.todoValue.value}</div><div>
                      <img class="edit todo-controls" src="../images/pencil.png" />
                      <img class="delete todo-controls" src="../images/delete.png" /></div></div>`;
      li.innerHTML = todoItems;
      this.listItems.appendChild(li);

      if (!this.todo) {
        this.todo = [];
      }
      let itemList = { item: this.todoValue.value, status: false };
      this.todo.push(itemList);
      this.setLocalStorageByDate(
        this.currentDate,
        this.todo,
        this.listItems.id
      );
    }
    this.todoValue.value = "";
    this.setAlertMessage("Todo item Created Successfully!");
  }

  readToDoItems() {
    this.listItems.innerHTML = "";
    this.todo.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Click to Complete">${element.item}
        ${
          style === ""
            ? ""
            : '<img class="todo-controls" src="images/check-mark.png" />'
        }</div><div>
        ${
          style === ""
            ? '<img class="edit todo-controls" src="images/pencil.png" />'
            : ""
        }
        <img class="delete todo-controls" src="images/delete.png" /></div></div>`;
      li.innerHTML = todoItems;
      this.listItems.appendChild(li);
    });
  }

  setAlertMessage(message) {
    this.todoAlert.removeAttribute("class");
    this.todoAlert.innerText = message;
    setTimeout(() => {
      this.todoAlert.classList.add("toggleMe");
    }, 1000);
  }

  deleteTask(element) {
    const itemText = element.parentElement.parentElement
      .querySelector("div")
      .textContent.trim();
    const index = this.todo.findIndex((task) => task.item === itemText);

    if (index > -1) {
      const confirmDelete = confirm(
        `Are you sure you want to delete "${itemText}"?`
      );

      if (confirmDelete) {
        this.todo.splice(index, 1);
        element.parentElement.parentElement.remove();
        this.setLocalStorageByDate(
          this.currentDate,
          this.todo,
          this.listItems.id
        );
      }
    }
  }

  editTask(element) {
    const itemText =
      element.parentElement.parentElement.querySelector("div").innerText;
    this.todoValue.value = itemText;
    this.addUpdate.onclick = () => this.updateTask(itemText);
    this.addUpdate.src = "../images/refresh.png";
    this.todoValue.focus();
  }

  updateTask(oldItemText) {
    const newItemText = this.todoValue.value.trim();
    if (newItemText === "") {
      this.setAlertMessage("Please enter your todo text!");
      this.todoValue.focus();
      return;
    }

    const index = this.todo.findIndex((task) => task.item === oldItemText);
    if (index > -1) {
      this.todo[index].item = newItemText;
      this.readToDoItems();
      this.setLocalStorageByDate(
        this.currentDate,
        this.todo,
        this.listItems.id
      );
      this.addUpdate.onclick = () => this.createToDoItems();
      this.addUpdate.src = "../images/plus.png";
      this.todoValue.value = "";
      this.setAlertMessage("Todo item Updated Successfully!");
    }
  }

  completeTask(element) {
    const itemText = element.innerText;
    const index = this.todo.findIndex((task) => task.item === itemText);
    if (index > -1) {
      element.style.textDecoration = "line-through";
      const img = document.createElement("img");
      img.src = "../images/check-mark.png";
      img.className = "todo-controls";
      element.appendChild(img);
      element.parentElement.querySelector(".edit").remove();
      this.todo[index].status = true;
      this.setLocalStorageByDate(
        this.currentDate,
        this.todo,
        this.listItems.id
      );
      this.setAlertMessage("Todo item Completed Successfully!");
    }
  }
}

function addDaysToDate(inputDate, daysToAdd) {
  const date = new Date(inputDate);
  date.setDate(date.getDate() + daysToAdd);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const currentDate = new Date();
const today = addDaysToDate(currentDate, 0);
const day_1 = addDaysToDate(currentDate, 1);
const day_2 = addDaysToDate(currentDate, 2);
const day_3 = addDaysToDate(currentDate, 3);
const day_4 = addDaysToDate(currentDate, 4);
const day_5 = addDaysToDate(currentDate, 5);
const day_6 = addDaysToDate(currentDate, 6);

const todoList = new ToDoList(
  "list-items",
  "Alert",
  "todoText",
  "AddUpdateClick",
  "datetime",
  today
);
const todoList2 = new ToDoList(
  "list-items2",
  "Alert2",
  "todoText2",
  "AddUpdateClick2",
  "datetime2",
  day_1
);
const todoList3 = new ToDoList(
  "list-items3",
  "Alert3",
  "todoText3",
  "AddUpdateClick3",
  "datetime3",
  day_2
);
const todoList4 = new ToDoList(
  "list-items4",
  "Alert4",
  "todoText4",
  "AddUpdateClick4",
  "datetime4",
  day_3
);
const todoList5 = new ToDoList(
  "list-items5",
  "Alert5",
  "todoText5",
  "AddUpdateClick5",
  "datetime5",
  day_4
);
const todoList6 = new ToDoList(
  "list-items6",
  "Alert6",
  "todoText6",
  "AddUpdateClick6",
  "datetime6",
  day_5
);
const todoList7 = new ToDoList(
  "list-items7",
  "Alert7",
  "todoText7",
  "AddUpdateClick7",
  "datetime7",
  day_6
);
