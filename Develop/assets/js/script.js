// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const submitTaskButtonEl = $('#add-tasks');
// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    
    const taskTitle=$('#taskTitle').val();
    const taskDueDate=$('#taskDueDate').val();
    const taskDescription=$('#taskDescription').val();
    
    
    // Close/hide the modal
    $('#formModal').modal('hide');

    const taskInfo = {
        title:taskTitle,
        dueDate:taskDueDate,
        description:taskDescription
    };

    // For debug

    console.log(taskInfo);


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

// Event listener on AddTasks button on Modal
submitTaskButtonEl.on('click', handleAddTask);