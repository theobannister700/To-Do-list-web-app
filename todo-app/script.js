let tasks = [];
let draggedIndex = null;
let placeholder = document.createElement("li");
placeholder.classList.add("placeholder");

/* =========================
   DRAG SETUP (COLUMNS)
========================= */

function setupDragAndDrop() {
    const lists = document.querySelectorAll(".column ul");

    lists.forEach(list => {
        list.addEventListener("dragover", (e) => {
            e.preventDefault();
            list.classList.add("drag-over");
        });

        list.addEventListener("dragleave", () => {
            list.classList.remove("drag-over");
        });

        list.addEventListener("drop", (e) => {
            e.preventDefault();
            list.classList.remove("drag-over");

            if (draggedIndex === null) return;

            const newCategory = list.dataset.category;
            const draggedTask = tasks[draggedIndex];

            if (!newCategory) return;

            draggedTask.category = newCategory;

            // Reorder if placeholder is in this list
            if (placeholder.parentNode === list) {
                const items = [...list.children];
                const newIndex = items.indexOf(placeholder);

                tasks.splice(draggedIndex, 1);
                tasks.splice(newIndex, 0, draggedTask);
            }

            saveTasks();
            renderTasks();
            draggedIndex = null;
        });
    });
}

/* =========================
   STORAGE
========================= */

function loadTasks() {
    const stored = localStorage.getItem("tasks");
    if (stored) tasks = JSON.parse(stored);
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* =========================
   ADD TASK
========================= */

function addTask() {
    const input = document.getElementById("taskInput");
    const category = document.getElementById("category").value;

    const text = input.value.trim();
    if (!text) return;

    tasks.push({
        text,
        category,
        completed: false,
        createdAt: Date.now()
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

/* =========================
   RENDER
========================= */

function renderTasks() {
    const workList = document.getElementById("workList");
    const personalList = document.getElementById("personalList");
    const studyList = document.getElementById("studyList");

    workList.innerHTML = "";
    personalList.innerHTML = "";
    studyList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        /* ===== TASK TEXT ===== */
        const span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = () => toggleTask(index);

        if (task.completed) span.classList.add("completed");

        /* ===== ACTION BUTTONS ===== */
        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => startEditing(span, index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        /* ===== COLUMN ASSIGN ===== */
        if (task.category === "Work") workList.appendChild(li);
        else if (task.category === "Personal") personalList.appendChild(li);
        else studyList.appendChild(li);

        li.draggable = true;

        /* ===== DRAG START ===== */
        li.addEventListener("dragstart", (e) => {
            draggedIndex = index;
            li.classList.add("dragging");

            li.after(placeholder);

            const ghost = li.cloneNode(true);
            ghost.classList.add("drag-ghost");

            document.body.appendChild(ghost);

            ghost.style.position = "absolute";
            ghost.style.top = "0";
            ghost.style.left = "0";
            ghost.style.visibility = "hidden";

            e.dataTransfer.setDragImage(
                ghost,
                ghost.offsetWidth / 2,
                ghost.offsetHeight / 2
            );

            li._ghost = ghost;
        });

        /* ===== DRAG END ===== */
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");

            if (li._ghost) {
                li._ghost.remove();
                li._ghost = null;
            }

            if (placeholder.parentNode) {
                placeholder.remove();
            }
        });

        /* ===== REORDER ===== */
        li.addEventListener("dragover", (e) => {
            e.preventDefault();

            const rect = li.getBoundingClientRect();
            const offset = e.clientY - rect.top;

            const isBelow = offset > rect.height / 2;

            if (isBelow) li.after(placeholder);
            else li.before(placeholder);
        });
    });
}

/* =========================
   EDIT TASK
========================= */

function startEditing(span, index) {
    const actions = span.parentElement.querySelector(".task-actions");
    if (actions) actions.style.display = "none";

    const input = document.createElement("input");
    input.type = "text";
    input.value = tasks[index].text;
    input.classList.add("edit-input");

    span.replaceWith(input);
    input.focus();

    function save() {
        const newText = input.value.trim();
        if (newText) {
            tasks[index].text = newText;
            saveTasks();
        }
        renderTasks();
        if (actions) actions.style.display = "flex";
    }

    function cancel() {
        renderTasks();
        if (actions) actions.style.display = "flex";
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") save();
        if (e.key === "Escape") cancel();
    });

    input.addEventListener("blur", save);
}

/* =========================
   TASK ACTIONS
========================= */

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function clearAll() {
    tasks = [];
    saveTasks();
    renderTasks();
}

/* =========================
   THEME
========================= */

function toggleTheme() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

/* =========================
   ENTER KEY
========================= */

document.getElementById("taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});

/* =========================
   INIT
========================= */

loadTasks();
setupDragAndDrop();