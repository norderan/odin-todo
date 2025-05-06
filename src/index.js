import "./styles.css";


// Composable behavior
const changePriority = (state) => ({
  changePriority(newPriority) {
    if (newPriority < 1 || newPriority > 3) {
      throw new Error("Priority must be between 1 and 3");
    }
    state.priority = newPriority;
  }
});

const changeTitle = (state) => ({
  changeTitle(newTitle) {
    if (newTitle.length < 3) {
      throw new Error("Title must be at least 3 characters long");
    }
    state.title = newTitle;
  }
});

const changeDescription = (state) => ({
  changeDescription(newDescription) {
    if (newDescription.length < 5) {
      throw new Error("Description must be at least 5 characters long");
    }
    state.description = newDescription;
  }
});

const changeCompletionStatus = (state) => ({
  changeCompletionStatus(newStatus) {
    state.isCompleted = newStatus;
  }
});

// Todo Factory
const createTodoItem = (title, description, dueDate, priority, isCompleted) => {
  const itemId = crypto.randomUUID();
  const state = { title, description, dueDate, priority, isCompleted, itemId };

  return Object.assign(
    state,
    changeTitle(state),
    changeDescription(state),
    changeCompletionStatus(state),
    changePriority(state)
  );
};


const todoList = (state) => ({
  addTodo(title, description, dueDate, priority, isCompleted) {
    const todo = createTodoItem(title, description, dueDate, priority, isCompleted);
    state.todos.push(todo);
    return todo;
  },
  removeTodo(todoId) {
    const index = state.todos.findIndex(todo => todo.itemId === todoId);
    if (index !== -1) state.todos.splice(index, 1);
  },
  getTodoById(todoId) {
    return state.todos.find(todo => todo.itemId === todoId);
  }
});


// Project Factory
const createProject = (title, description, isCompleted) => {
  const state = {
    title,
    description,
    isCompleted,
    projectId: crypto.randomUUID(),
    todos: []
  };

  return Object.assign(
    state,
    changeTitle(state),
    changeDescription(state),
    changeCompletionStatus(state),
    todoList(state)
  );
};


// Controller module
const controller = (function () {
  const projectList = [];

  const addProject = (title, description) => {
    const project = createProject(title, description, false);
    projectList.push(project);
    return project;
  };

  const getProjectById = (projectId) =>
    projectList.find(project => project.projectId === projectId);

  const removeProject = (projectId) => {
    const projectIndex = projectList.findIndex(project => project.projectId === projectId);
    if (projectIndex !== -1) {
      projectList.splice(projectIndex, 1);
    }
  };

  return {
    addProject,
    getProjectById,
    removeProject,
  };
})();



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

const project1 = controller.addProject("Project 1", "Description for Project 1");


project1.addTodo("Todo 1", "Description for Todo 1", "2023-10-01", 2, false);

project1.changeCompletionStatus(true);
project1.changeTitle("Updated Project 1");
project1.changeDescription("Updated description for Project 1");

