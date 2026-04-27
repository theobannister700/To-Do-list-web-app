📝 Kanban To-Do App

A clean, minimal Kanban-style to-do list built with vanilla JavaScript, HTML, and CSS.
Tasks can be created, edited, dragged between columns, and persisted using local storage.

✨ Features
 -✅ Add tasks with categories (Work, Personal, Study)
 -🖱️ Drag & drop tasks between columns
 -🔄 Reorder tasks within columns
 -✏️ Inline editing (double-click to edit)
 -✔️ Mark tasks as completed
 -❌ Delete individual tasks
 -🧹 Clear all tasks
 -🌙 Dark mode (saved in local storage)
 -💾 Persistent storage using localStorage
 -🧠 How It Works

Tasks are stored as objects
Data is saved in the browser using localStorage
UI updates dynamically using DOM manipulation
Drag-and-drop is implemented using the HTML5 Drag API

🚀 Getting Started

 -Open the project folder:
 -Open index.html in your browser
 -(No build tools or dependencies required.)

📁 Project Structure
/kanban-todo-app
│
├── index.html   # App structure
├── style.css    # UI styling
└── script.js    # App logic

🎮 Usage
 -Type a task → press Enter or click Add
 -Drag tasks between columns
 -Double-click a task to edit it
 -Click a task once to mark it complete
 -Use the X button to delete a task
 -Use Clear All to reset everything

🎨 Design Notes
 -Inspired by Kanban boards like Trello
 -Focus on simplicity and usability
 -Smooth drag interactions and subtle animations
 -Responsive layout with clean spacing

🔮 Future Improvements
 -Due dates & reminders
 -Task priority labels
 -Search & filtering
 -Backend storage (database)
 -User accounts
 -Mobile optimizations 

🛠️ Tech Stack
 -HTML5
 -CSS3
 -Vanilla JavaScript (ES6)

📌 Notes
 -All data is stored locally in your browser
 -Clearing browser storage will remove all tasks
