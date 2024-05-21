document.addEventListener("DOMContentLoaded", function () {
    const projectList = JSON.parse(localStorage.getItem("projects"));
    const currentDate = new Date();
    let closestProject;
    let closestDateDifference = Infinity;
  
    projectList.forEach(function (project) {
      const dueDate = new Date(project.dueDate);
      const dateDifference = Math.abs(dueDate - currentDate);
      if (dateDifference < closestDateDifference) {
        closestDateDifference = dateDifference;
        closestProject = project;
      }
    });
  
    const closestProjectElement = document.createElement("div");
    closestProjectElement.classList.add("closest-project");
    closestProjectElement.innerHTML = `
      <h2>Closest Project:</h2>
      <h3>${closestProject.title}</h3>
      <p><strong>Due Date:</strong> ${closestProject.dueDate}</p>
      <p><strong>Creation Date:</strong> ${closestProject.creationDate}</p>
    `;
  
    const todoContainer = document.querySelector(".container");
    todoContainer.parentNode.insertBefore(closestProjectElement, todoContainer.nextSibling);
  });
  