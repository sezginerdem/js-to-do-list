// Select the form element with the id 'add-task-form'
const addTaskForm = document.querySelector('#add-task-form');
// Select the input element with the id 'task-input'
const taskInput = document.querySelector('#task-input');
// Select the unordered list element with the id 'task-list'
const taskList = document.querySelector('#task-list');
// Select the span element with the id 'remaining-tasks'
const remainingTasks = document.querySelector('#remaining-tasks');
// Initialize an empty array to store tasks
let tasks = [];
// Add an event listener to the form to listen for submit events
addTaskForm.addEventListener('submit', event => {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Get the value of the task input
  const taskDescription = taskInput.value;
  // Check if the task description is not empty
  if (taskDescription) {
    // Create a new task object with a description and completed property
    const task = {
      description: taskDescription,
      completed: false
    };
    // Add the new task to the tasks array
    tasks.push(task);
    // Clear the task input value
    taskInput.value = '';
    // Call the renderTasks function to update the task list display
    renderTasks();
  }
});

// Add an event listener to the task list to listen for click events
taskList.addEventListener('click', event => {
  // Check if the clicked element has the class 'complete-button'
  if (event.target.classList.contains('complete-button')) {
    // Get the index of the task from the parent element's data-index attribute
    const taskIndex = event.target.parentElement.dataset.index;
    // Toggle the completed property of the task at the given index
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    // Call the renderTasks function to update the task list display
    renderTasks();
  }
  // Check if the clicked element has the class 'delete-button'
  if (event.target.classList.contains('delete-button')) {
    // Get the index of the task from the parent element's data-index attribute
    const taskIndex = event.target.parentElement.dataset.index;
    // Remove the task at the given index from the tasks array
    tasks.splice(taskIndex, 1);
    // Call the renderTasks function to update the task list display
    renderTasks();
  }
});

// Define a function to render the tasks in the task list
function renderTasks() {
  // Clear the task list inner HTML
  taskList.innerHTML = '';
  // Loop through each task in the tasks array
  tasks.forEach((task, index) => {
    // Create a new list item element
    const listItem = document.createElement('li');
    // Add the class 'task-item' to the list item
    listItem.classList.add('task-item');
    // Set the data-index attribute of the list item to the current index
    listItem.dataset.index = index;
    // Create a new span element to display the task description
    const descriptionSpan = document.createElement('span');
    // Set the text content of the span to the task description
    descriptionSpan.textContent = task.description;
    // Check if the task is completed
    if (task.completed) {
      // Add the class 'completed' to the description span
      descriptionSpan.classList.add('completed');
    }
    // Append the description span to the list item
    listItem.appendChild(descriptionSpan);
    // Create a new button element for marking the task as completed
    const completeButton = document.createElement('button');
    // Set the text content of the button to 'Mark as Completed'
    completeButton.textContent = 'Mark as Completed';
    // Add the class 'complete-button' to the button
    completeButton.classList.add('complete-button');
    // Append the complete button to the list item
    listItem.appendChild(completeButton);
    // Create a new button element for deleting the task
    const deleteButton = document.createElement('button');
    // Set the text content of the button to 'Delete'
    deleteButton.textContent = 'Delete';
    // Add the class 'delete-button' to the button
    deleteButton.classList.add('delete-button');
    // Append the delete button to the list item
    listItem.appendChild(deleteButton);
    // Append the list item to the task list
    taskList.appendChild(listItem);
  });
  // Update the remaining tasks display with the number of incomplete tasks
  remainingTasks.textContent = tasks.filter(task => !task.completed).length;
}
// Call the renderTasks function to initially render the tasks in the task list
renderTasks();