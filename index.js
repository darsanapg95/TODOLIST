document.addEventListener('DOMContentLoaded', function() {
    // Get the task input, add task button, and task list
    var taskInput = document.getElementById('taskInput');
    var addTaskButton = document.getElementById('addTaskButton');
    var taskList = document.getElementById('taskList');
  
    // Load tasks from local storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to render the tasks on the page
    function renderTasks() {
        // Clear the task list
        taskList.innerHTML = '';
  
        // Render each task as a list item
        tasks.forEach(function(task, index) {
            var listItem = document.createElement('li');
            listItem.textContent = task;
            
            // Add a class to completed tasks
            if (task.completed) {
                listItem.classList.add('completed');
            }
  
            // Create a button to mark the task as completed
            var completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', function() {
                toggleTaskCompleted(index);
            });
  
            // Create a button to remove the task
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function() {
                removeTask(index);
            });
  
            // Append the buttons to the list item
            listItem.appendChild(completeButton);
            listItem.appendChild(removeButton);
  
            // Append the list item to the task list
            taskList.appendChild(listItem);
        });
    }
  
    // Function to add a new task
    function addTask() {
        var taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }
  
    // Function to toggle the completed status of a task
    function toggleTaskCompleted(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
  
    // Function to remove a task
    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
  
    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Add task event listener
    addTaskButton.addEventListener('click', addTask);
  
    // Render initial tasks
    renderTasks();
  });
  