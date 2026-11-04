const taskList = document.getElementById("taskList");
const taskInputArea = document.getElementById("taskInputArea");
const taskInput = document.getElementById("taskInput");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

let currentFilter = "all";

function addTask(name) {
    if (!name || !name.trim()) {
        return false;
    }

    const task = document.createElement("div");
    task.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";

    const title = document.createElement("span");
    title.textContent = name.trim();

    const tag = document.createElement("span");
    tag.className = "tag pending-tag";
    tag.textContent = "Pending";

    checkbox.addEventListener("change", () => {
        updateTaskStatus(task, checkbox, tag);
        updateCounts();
        applyFilter();
    });

    task.append(checkbox, title, tag);
    taskList.appendChild(task);

    updateCounts();
    applyFilter();

    return true;
}

function updateTaskStatus(task, checkbox, tag) {
    if (checkbox.checked) {
        task.classList.add("completed-task");
        tag.className = "tag completed-tag";
        tag.textContent = "Completed";
    } else {
        task.classList.remove("completed-task");
        tag.className = "tag pending-tag";
        tag.textContent = "Pending";
    }
}

function updateCounts() {
    const tasks = taskList.querySelectorAll(".task-item");
    let completed = 0;

    tasks.forEach(task => {
        if (task.querySelector("input").checked) {
            completed++;
        }
    });

    const pending = tasks.length - completed;

    completedCount.textContent = String(completed).padStart(2, "0");
    pendingCount.textContent = String(pending).padStart(2, "0");
}

function applyFilter() {
    const tasks = taskList.querySelectorAll(".task-item");

    tasks.forEach(task => {
        const isCompleted = task.querySelector("input").checked;

        if (currentFilter === "all") {
            task.style.display = "flex";
        } else if (currentFilter === "completed") {
            task.style.display = isCompleted ? "flex" : "none";
        } else {
            task.style.display = isCompleted ? "none" : "flex";
        }
    });
}

document.getElementById("addTaskButton").addEventListener("click", () => {
    taskInputArea.classList.toggle("visible");
    taskInput.focus();
});

document.getElementById("saveTaskButton").addEventListener("click", () => {
    if (addTask(taskInput.value)) {
        taskInput.value = "";
        taskInputArea.classList.remove("visible");
    }
});

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.getElementById("saveTaskButton").click();
    }
});

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(item => {
            item.classList.remove("active-filter");
        });

        button.classList.add("active-filter");
        currentFilter = button.dataset.filter;
        applyFilter();
    });
});

document.querySelectorAll(".task-check").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const task = checkbox.closest(".task-item");
        const tag = task.querySelector(".tag");

        updateTaskStatus(task, checkbox, tag);
        updateCounts();
        applyFilter();
    });
});

updateCounts();

if (typeof module !== "undefined") {
    module.exports = { addTask };
}