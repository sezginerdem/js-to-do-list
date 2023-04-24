const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const dueDateInput = document.getElementById('due-date-input');
const categoryInput = document.getElementById('category-input');
const addTaskForm = document.querySelector('#add-task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const remainingTasks = document.querySelector('#remaining-tasks');
let tasks = [];

addTaskForm.addEventListener('submit', event => {
  event.preventDefault();
  const taskDescription = taskInput.value;
  if (taskDescription) {
    const task = {
      description: taskDescription,
      completed: false
    };
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
  }
});

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  const tasks = taskList.querySelectorAll('li');
  tasks.forEach(task => {
    const taskText = task.textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
});

taskList.addEventListener('click', event => {
  if (event.target.classList.contains('complete-button')) {
    const taskIndex = event.target.parentElement.dataset.index;
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
  }
  if (event.target.classList.contains('delete-button')) {
    const taskIndex = event.target.parentElement.dataset.index;
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.dataset.index = index;
    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = task.description;
    if (task.completed) {
      descriptionSpan.classList.add('completed');
    }
    listItem.appendChild(descriptionSpan);
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Mark as Completed';
    completeButton.classList.add('complete-button');
    listItem.appendChild(completeButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
  remainingTasks.textContent = tasks.filter(task => !task.completed).length;
}
