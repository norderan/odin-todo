import { controller } from "./project-and-todos-logic.js";

function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(controller.projectList));
  console.log("[+] Projects saved to localStorage.");
}

function loadProjectsFromLocalStorage() {
  console.log("[+] Loading projects from localStorage...");
  const projects = JSON.parse(localStorage.getItem("projects"));
  if (projects) {
    controller.projectList = projects;
    console.log("[+] Projects loaded from localStorage.");
  } else {
    console.log("[-] No projects found in localStorage.");
  }
}


export { saveProjectsToLocalStorage, loadProjectsFromLocalStorage };