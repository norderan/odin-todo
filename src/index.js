import "./styles.css";
import { controller, createProject, createTodoItem } from "./project-and-todos-logic.js";
import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from "./storage-logic.js";


/* Availble functions 
--- for todo items ---
- changePriority(newPriority)
- changeTitle(newTitle)
- changeDescription(newDescription)
- changeCompletionStatus(newStatus)

--- for projects ---
- changeTitle(newTitle)
- changeDescription(newDescription)
- changeCompletionStatus(newStatus)

--- for todo lists ---
- addTodo(title, description, dueDate, priority, isCompleted)
- removeTodo(todoId)
- getTodoById(todoId)

--- for controller ---
- addProject(title, description)
- getProjectById(projectId)
- removeProject(projectId)

*/

//need fix to load: loadProjectsFromLocalStorage()

const project1 = controller.addProject("Project 1", "Description for Project 1");
project1.addTodo("Todo 1", "Description for Todo 1", "2023-10-01", 2, false);
project1.addTodo("Todo 2", "Description for Todo 2", "2023-10-02", 1, true);
project1.addTodo("Todo 3", "Description for Todo 3", "2023-10-03", 3, false);

const project2 = controller.addProject("Project 2", "Description for Project 2");
project2.addTodo("Todo 4", "Description for Todo 4", "2023-10-04", 2, false);
project2.addTodo("Todo 5", "Description for Todo 5", "2023-10-05", 1, true);
const project3 = controller.addProject("Project 3", "Description for Project 3");

console.log("Project List:", controller.projectList);

saveProjectsToLocalStorage()

// display the projects
const projectContainer = document.getElementById("projects");
controller.projectList.forEach(project => {
  const projectElement = document.createElement("div");
  projectElement.dataset.projectId = project.projectId; 
  projectElement.classList.add("project-card");
  projectElement.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <p>${project.isCompleted ? "Completed" : "Ongoing"}</p>
  `;
  projectContainer.appendChild(projectElement);
});


// load todos of a project
const projectCards = document.querySelectorAll(".project-card");
let projectId = null;
projectCards.forEach(card => {
  card.addEventListener("click", () => {
    console.log("Card clicked!", card.dataset.projectId);
    projectId = card.dataset.projectId;
    while (projectContainer.firstChild) {
        projectContainer.removeChild(projectContainer.firstChild);
      }
    loadTodosAndProjectInfo(projectId);
  });
});


function loadTodosAndProjectInfo(projectId) {
  const project = controller.getProjectById(projectId);
  console.log("Project:", project);
  if (project) {
    const todoList = project.todos;
    todoList.forEach(todo => {
      const todoElement = document.createElement("div");
      todoElement.dataset.todoId = todo.todoId; 
      todoElement.classList.add("todo-card");
      todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>Due Date: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <p>${todo.isCompleted ? "Completed" : "Not Completed"}</p>
      `;
      projectContainer.appendChild(todoElement);
    });
  }
}
