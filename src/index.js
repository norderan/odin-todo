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
project3.addTodo("Todo 6", "Description for Todo 6", "2023-10-06", 2, false);
const project4 = controller.addProject("Project 4", "Description for Project 4");
project4.addTodo("Todo 7", "Description for Todo 7", "2023-10-07", 1, true);
project4.addTodo("Todo 8", "Description for Todo 8", "2023-10-08", 3, false);
project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);
project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);

project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);


project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);
project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);
project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);
project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);
project4.addTodo("Todo 9", "Description for Todo 9", "2023-10-09", 2, false);


console.log("Project List:", controller.projectList);

saveProjectsToLocalStorage()
// display the projects
displayProjects();
function displayProjects() {
  const projectContainer = document.getElementById("projects-container");
  controller.projectList.forEach(project => {
    const projectElement = document.createElement("div");
    projectElement.dataset.projectId = project.projectId; 
    projectElement.classList.add("project-card");
    projectElement.innerHTML = `
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <div> 
        <button class="complition-status-project">${project.isCompleted ? "Completed" : "Not Completed"}</button>
        <button class="delete-project">Delete</button>
      </div>
    `;
    projectContainer.appendChild(projectElement);
    const projectDeleteButton = projectElement.querySelectorAll(".delete-project");
    projectDeleteButton.forEach(button => {
      button.addEventListener("click", (e) => {
        const projectId = e.target.closest(".project-card").dataset.projectId;
        console.log("Project ID:", projectId);
        controller.removeProject(projectId);
        clearTodosContainer();
        projectContainer.removeChild(projectElement);
      });
    });

    const projectCompletionButtons = projectElement.querySelectorAll(".complition-status-project");
    projectCompletionButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const projectId = e.target.closest(".project-card").dataset.projectId;
        console.log("Project ID:", projectId);
        const project = controller.getProjectById(projectId);
        if (project) {
          project.changeCompletionStatus(!project.isCompleted);
          console.log("Project completion status changed:", project.isCompleted);
          clearProjectContainer();
          displayProjects();
        }
      });
    });
  });
}


// Event listener for project card click
const projectCards = document.querySelectorAll(".project-card");
let projectId = null;
projectCards.forEach(card => {
  card.addEventListener("click", () => {
    console.log("Card clicked!", card.dataset.projectId);
    projectId = card.dataset.projectId;
    clearTodosContainer();
    loadTodos(projectId);
  });
});


// clear project container
const projectContainer = document.getElementById("projects-container");
function clearProjectContainer() {
  while (projectContainer.firstChild) {
    projectContainer.removeChild(projectContainer.firstChild);
  }
}
// clear todos container
const todosContainer = document.getElementById("todos-container");
function clearTodosContainer() {
  while (todosContainer.firstChild) {
    todosContainer.removeChild(todosContainer.firstChild);
  }
}


const addTodoButton = document.createElement("button");
addTodoButton.textContent = "+";
addTodoButton.id = "open-todo-dialog";
// Load todos for the selected project
function loadTodos(projectId) {
  const project = controller.getProjectById(projectId);
  if (project) {
    const todoList = project.todos;
    console.log("Todo List:", todoList);
    todoList.forEach(todo => {
      const todoElement = createTodoElement(todo);
      todosContainer.appendChild(todoElement);
    });

    addTodoButton.dataset.parentProjectId = projectId;
    todosContainer.appendChild(addTodoButton);
    todoFormHandler();
  }

  attachTodoDeleteListeners(projectId);
  attachTodoCompletionListeners(projectId);
}

// Create a todo element
function createTodoElement(todo) {
  const todoElement = document.createElement("div");
  todoElement.dataset.todoId = todo.itemId;
  todoElement.classList.add("todo-card");
  todoElement.innerHTML = `
    <h3>${todo.title}</h3>
    <p>${todo.description}</p>
    <p>Due Date: ${todo.dueDate}</p>
    <p>Priority: ${todo.priority}</p>
    <div> 
      <button class="complition-status">${todo.isCompleted ? "Completed" : "Not Completed"}</button>
      <button class="delete-todo">Delete</button>
    </div>
  `;
  return todoElement;
}

// Attach delete listeners to todos
function attachTodoDeleteListeners(projectId) {
  const todoDeleteButtons = document.querySelectorAll(".delete-todo");
  todoDeleteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const todoId = e.target.closest(".todo-card").dataset.todoId;
      console.log("Todo ID:", todoId);
      const project = controller.getProjectById(projectId);
      if (project) {
        project.removeTodo(todoId);
        clearTodosContainer();
        loadTodos(projectId);
      }
    });
  });
}

// Attach completion status listeners to todos
function attachTodoCompletionListeners(projectId) {
  const todoCompletionButtons = document.querySelectorAll(".complition-status");
  todoCompletionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const todoId = e.target.closest(".todo-card").dataset.todoId;
      console.log("Todo ID:", todoId);
      const project = controller.getProjectById(projectId);
      if (project) {
        const todo = project.getTodoById(todoId);
        if (todo) {
          todo.changeCompletionStatus(!todo.isCompleted);
          console.log("Todo completion status changed:", todo.isCompleted);
          clearTodosContainer();
          loadTodos(projectId);
        }
      }
    });
  });
}


// Forms

const projectForm = document.querySelector('#project-form');
const projectDialog = document.querySelector("#project-dialog");

const openProjectDialogButton = document.getElementById("open-project-dialog");
const closeProjectDialogButton = document.getElementById("close-project-dialog");


openProjectDialogButton.addEventListener("click", () => {
  projectDialog.showModal();
});

closeProjectDialogButton.addEventListener("click", () => {
  projectDialog.close();
});

projectForm.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const formData = new FormData(projectForm);
  controller.addProject(
  formData.get("project-name"),
  formData.get("project-description")
  );

  projectForm.reset();
  projectDialog.close();
  clearProjectContainer();
  displayProjects();
});



function todoFormHandler() {
  const todoForm = document.getElementById('todo-form');
  const todoDialog = document.getElementById("todo-dialog");

  const openTodoDialogButton = document.getElementById("open-todo-dialog");
  const closeTodoDialogButton = document.getElementById("todo-close-button");

  openTodoDialogButton.addEventListener("click", () => {
    todoDialog.showModal();
  });

  closeTodoDialogButton.addEventListener("click", () => {
    todoDialog.close();
  });

  todoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(todoForm);
    const title = formData.get("todo-title");
    const description = formData.get("todo-description");
    const dueDate = formData.get("todo-dueDate");


    const projectId = openTodoDialogButton.dataset.parentProjectId;
    const project = controller.getProjectById(projectId);
    if (project) {
      project.addTodo(
        title,
        description,
        dueDate,
        1, // Default priority
        false // Default completion status
      );
      const todoElement = createTodoElement(project.getTodoById(project.todos[project.todos.length - 1].itemId));
      todosContainer.appendChild(todoElement);
      attachTodoDeleteListeners(projectId);
      attachTodoCompletionListeners(projectId);
    }

    todoForm.reset();
    todoDialog.close();
  });
}

