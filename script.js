// Select all elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const categorySelect = document.getElementById("category");
const prioritySelect = document.getElementById("priority");
const filterCategory = document.getElementById("filterCategory");
const themeToggle = document.getElementById("themeToggle");

// Load tasks and theme
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

// Apply saved theme on load
if (darkMode) {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode";
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function saveTheme() {
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Render all tasks
function renderTasks() {
  taskList.innerHTML = "";
  const filtered = tasks.filter(
    (t) => filterCategory.value === "All" || t.category === filterCategory.value
  );

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <div class="info">
        <strong>${task.text}</strong>
        <small>${task.category} | Priority: ${task.priority}</small>
      </div>
      <div class="actions">
        <button class="done">✔</button>
        <button class="edit">✏</button>
        <button class="delete">🗑</button>
      </div>
    `;

    li.querySelector(".done").addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    li.querySelector(".edit").addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    });

    li.querySelector(".delete").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Add new task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const category = categorySelect.value;
  const priority = prioritySelect.value;

  if (text === "") return alert("Please enter a task!");

  tasks.push({ text, category, priority, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Filter
filterCategory.addEventListener("change", renderTasks);

// ✅ Dark Mode Toggle — now clickable
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
  saveTheme();
});

// Initial render
renderTasks();
