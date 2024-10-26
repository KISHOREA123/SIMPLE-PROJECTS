document.getElementById("add-task-button").addEventListener("click", addTask);
document.getElementById("clear-all-button").addEventListener("click", clearAllTasks);

document.addEventListener("DOMContentLoaded", loadTasksFromStorage);

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskTimeInput = document.getElementById("task-time");
    const taskValue = taskInput.value.trim();
    const taskTimeValue = taskTimeInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    const taskList = document.getElementById("task-list");
    const newTask = document.createElement("li");

    const taskContent = document.createElement("span");
    taskContent.className = "task-content";
    taskContent.textContent = taskValue;

    const taskTime = document.createElement("span");
    taskTime.className = "task-time";
    taskTime.textContent = taskTimeValue ? `Due: ${new Date(taskTimeValue).toLocaleString()}` : "";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.onclick = function () {
        taskList.removeChild(newTask);
        saveTasksToStorage();
    };

    newTask.appendChild(taskContent);
    newTask.appendChild(taskTime);
    newTask.appendChild(deleteButton);

    newTask.addEventListener("click", function () {
        newTask.classList.toggle("completed");
        saveTasksToStorage();
    });

    taskList.appendChild(newTask);
    taskInput.value = "";
    taskTimeInput.value = "";

    saveTasksToStorage();
}

function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";
        localStorage.removeItem("tasks");
    }
}

function saveTasksToStorage() {
    const taskList = document.getElementById("task-list").children;
    const tasks = [];

    for (let task of taskList) {
        tasks.push({
            content: task.querySelector(".task-content").textContent,
            time: task.querySelector(".task-time").textContent,
            completed: task.classList.contains("completed")
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (let task of tasks) {
        const taskList = document.getElementById("task-list");
        const newTask = document.createElement("li");

        const taskContent = document.createElement("span");
        taskContent.className = "task-content";
        taskContent.textContent = task.content;

        const taskTime = document.createElement("span");
        taskTime.className = "task-time";
        taskTime.textContent = task.time;

        if (task.completed) {
            newTask.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = function () {
            taskList.removeChild(newTask);
            saveTasksToStorage();
        };

        newTask.appendChild(taskContent);
        newTask.appendChild(taskTime);
        newTask.appendChild(deleteButton);

        newTask.addEventListener("click", function () {
            newTask.classList.toggle("completed");
            saveTasksToStorage();
        });

        taskList.appendChild(newTask);
    }
}
