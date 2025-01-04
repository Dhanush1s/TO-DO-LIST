// Updated JavaScript for Dark Mode Fix
const timeElement = document.getElementById('current-time');
const modeToggle = document.getElementById('mode-toggle');
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearAllButton = document.getElementById('clear-all');
const prioritySelect = document.getElementById('priority-select');

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

function createTaskElement(taskText, priority) {
    const li = document.createElement('li');
    li.classList.add(priority);
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete">✔</button>
            <button class="delete">✖</button>
        </div>
    `;

    li.querySelector('.complete').addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    li.querySelector('.delete').addEventListener('click', () => {
        li.remove();
    });

    return li;
}

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText) {
        const taskElement = createTaskElement(taskText, priority);
        taskList.appendChild(taskElement);
        taskInput.value = '';
    }
});

clearAllButton.addEventListener('click', () => {
    taskList.innerHTML = '';
});

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    if (isDarkMode) {
        document.body.style.background = 'var(--background-gradient-dark)';
        modeToggle.textContent = 'Switch to Light Mode';
    } else {
        document.body.style.background = backgroundColors[currentColorIndex];
        modeToggle.textContent = 'Switch to Dark Mode';
    }
});

let backgroundColors = ["#ff9a9e", "#fad0c4", "#fbc2eb", "#a6c0fe", "#f5f7fa"];
let currentColorIndex = 0;

setInterval(() => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (!isDarkMode) {
        document.body.style.background = backgroundColors[currentColorIndex];
        currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
    }
}, 2000);