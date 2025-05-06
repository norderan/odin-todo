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

loadProjectsFromLocalStorage()
const project1 = controller.addProject("Project 1", "Description for Project 1");
project1.addTodo("Todo 1", "Description for Todo 1", "2023-10-01", 2, false);
project1.addTodo("Todo 2", "Description for Todo 2", "2023-10-02", 1, true);
project1.addTodo("Todo 3", "Description for Todo 3", "2023-10-03", 3, false);
saveProjectsToLocalStorage()
