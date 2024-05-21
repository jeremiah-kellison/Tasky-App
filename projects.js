document.addEventListener("DOMContentLoaded", function () {
    const projectForm = document.getElementById("project-form");
    const projectList = document.getElementById("project-list");
  
    projectForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const title = document.getElementById("project-title").value;
      const dueDate = document.getElementById("project-due-date").value;
  
      createProject(title, dueDate);
  
      projectForm.reset();
    });
  
    let projects = [];
  
    function createProject(title, dueDate) {
      const project = {
        title: title,
        dueDate: formatDate(dueDate),
        creationDate: formatDate(new Date()),
        tasks: [],
      };
  
      projects.push(project);
  
      saveProjectsToStorage();
      displayProjects();
    }
  
    function addTask(project, taskTitle, taskDueDate) {
      const task = {
        title: taskTitle,
        dueDate: formatDate(taskDueDate),
        creationDate: formatDate(new Date()),
      };
      project.tasks.push(task);
    }
  
    function deleteTask(project, index) {
      project.tasks.splice(index, 1);
    }
  
    function saveProjectsToStorage() {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  
    function loadProjectsFromStorage() {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        projects = JSON.parse(storedProjects);
      }
    }
  
    function displayProjects() {
      projectList.innerHTML = "";
  
      projects.forEach(function (project, projectIndex) {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.innerHTML = `
          <h3>${project.title}</h3>
          <p><strong>Due Date:</strong> ${project.dueDate}</p>
          <p><strong>Creation Date:</strong> ${project.creationDate}</p>
          <button class="add-task-btn" data-index="${projectIndex}">Add Task</button>
          <div class="task-form" id="task-form-${projectIndex}" style="display: none;">
            <label for="task-title-${projectIndex}">Task Title:</label>
            <input type="text" id="task-title-${projectIndex}" required>
            <label for="task-due-date-${projectIndex}">Due Date:</label>
            <input type="date" id="task-due-date-${projectIndex}" required>
            <button class="submit-task-btn" data-index="${projectIndex}">Add Task</button>
          </div>
          <div class="task-list"></div>
          <button class="delete-project-btn" data-index="${projectIndex}">Delete Project</button>
        `;
  
        const addTaskBtn = projectElement.querySelector(".add-task-btn");
        const taskForm = projectElement.querySelector(`#task-form-${projectIndex}`);
        const submitTaskBtn = projectElement.querySelector(".submit-task-btn");
  
        addTaskBtn.addEventListener("click", function () {
          taskForm.style.display = "block";
        });
  
        submitTaskBtn.addEventListener("click", function (event) {
          event.preventDefault();
          const taskTitle = document.getElementById(`task-title-${projectIndex}`).value;
          const taskDueDate = document.getElementById(`task-due-date-${projectIndex}`).value;
          if (taskTitle && taskDueDate) {
            addTask(projects[projectIndex], taskTitle, taskDueDate);
            saveProjectsToStorage();
            displayProjects();
          }
        });
  
        const taskList = projectElement.querySelector(".task-list");
        project.tasks.forEach(function (task, taskIndex) {
          const taskElement = document.createElement("div");
          taskElement.classList.add("task");
          taskElement.innerHTML = `
            <p><strong>Task:</strong> ${task.title}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Creation Date:</strong> ${task.creationDate}</p>
            <div class="task-options">
              <button class="delete-task-btn" data-project-index="${projectIndex}" data-task-index="${taskIndex}">Delete Task</button>
            </div>
          `;
          taskList.appendChild(taskElement);
        });
  
        const deleteProjectBtn = projectElement.querySelector(".delete-project-btn");
        deleteProjectBtn.addEventListener("click", function () {
          if (confirm("Are you sure you want to delete this project?")) {
            projects.splice(projectIndex, 1);
            saveProjectsToStorage();
            displayProjects();
          }
        });
  
        taskList.addEventListener("click", function (event) {
          if (event.target.classList.contains("delete-task-btn")) {
            const projectIndex = event.target.getAttribute("data-project-index");
            const taskIndex = event.target.getAttribute("data-task-index");
            if (confirm("Are you sure you want to delete this task?")) {
              deleteTask(projects[projectIndex], taskIndex);
              saveProjectsToStorage();
              displayProjects();
            }
          }
        });
  
        projectList.appendChild(projectElement);
      });
    }
  
    function formatDate(date) {
      const dateObj = new Date(date);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${month}/${day}/${year}`;
    }
  
    loadProjectsFromStorage();
    displayProjects();
  });
  