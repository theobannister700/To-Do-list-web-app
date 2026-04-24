let tasks = [];

function setupDragAndDrop() {
    const lists = document.querySelectorAll(".categories ul");

    lists.forEach(list => {
        list.addEventListener("dragover", e => {
            e.preventDefault();
        });

        list.addEventListener("drop", e => {
            const index = document.querySelector(".dragging").dataset.index;
            const newCategory = list.id === "workList"
                ? "Work"
                : list.id === "personalList"
                ? "Personal"
                : "Study";

            tasks[index].category = newCategory;
            saveTasks();
            renderTasks();
        });
    });
}

// Load saved data
function loadTasks() {
    const stored = localStorage.getItem("tasks");
    if (stored) {
        tasks = JSON.parse(stored);
    }
    renderTasks();
}

// Save data
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {
    const input = document.getElementById("taskInput");
    const category = document.getElementById("category").value;

    const text = input.value.trim();
    if (text === "") return;

    tasks.push({
        text: text,
        category: category,
        completed: false,
        time: new Date().toLocaleString()
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const workList = document.getElementById("workList");
    const personalList = document.getElementById("personalList");
    const studyList = document.getElementById("studyList");

    workList.innerHTML = "";
    personalList.innerHTML = "";
    studyList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerHTML = `
            ${task.text}
            <small>(${task.time})</small>
        `;

        span.onclick = () => toggleTask(index);

        if (task.completed) {
            span.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Sort into categories
        if (task.category === "Work") {
            workList.appendChild(li);
        } 
        else if (task.category === "Personal") {
            personalList.appendChild(li);
        } 
        else if (task.category === "Study") {
            studyList.appendChild(li);
        }

        li.draggable = true;

        li.addEventListener("dragstart", function () {
            li.classList.add("dragging");
            li.dataset.index = index;
});

        li.addEventListener("dragend", function () {
            li.classList.remove("dragging");
});
    });
}

// Toggle complete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Clear all tasks
function clearAll() {
    tasks = [];
    saveTasks();
    renderTasks();
}

// Dark mode
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

loadTasks();
setupDragAndDrop();