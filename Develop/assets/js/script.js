// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));
const submitTaskButtonEl = $('#add-tasks');
// const toDoCardsEl = $('#todo-cards');
// const inProgressCardsEl = $('#in-progress');
// const doneCardsEl = $('#done');
let taskList = [];
let cardsSwimLaneEl = '';
// Todo: create a function to generate a unique task id
function generateTaskId() {
    return "ID-" + new Date().getTime();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // Create div for Card
    const cardEl = $('<div>');

    const dueDate = dayjs(task.dueDate).format('YYYY-MM-DD')
    const currentDate = dayjs().format('YYYY-MM-DD')
    let cardElClass = ''

    if (dueDate < currentDate) {
        cardElClass = 'card text-dark text-center bg-danger mb-3 task-card'
    } else if (dueDate === currentDate) {
        cardElClass = 'card text-dark text-center bg-warning mb-3 task-card'
    } else {
        cardElClass = 'card text-dark text-center bg-light mb-3 task-card'
    }

    cardEl.addClass(`${cardElClass}`);

    // Add generated Task Id as Data Attribute
    cardEl.attr('data-id', task.id);

    // Create div for Card Header
    const cardHeaderEl = $('<div>');
    cardHeaderEl.addClass('card-header');
    cardHeaderEl.text(task.title);

    // Append Card Header to Card
    cardEl.append(cardHeaderEl);

    // Create div for Card Body
    const cardBodyEl = $('<div>');
    cardBodyEl.addClass('card-body');

    // Create paragraph for Due Date
    const pElDate = $('<p>');
    pElDate.addClass('card-text');
    pElDate.text(task.dueDate);

    // Append Paragraph element to Card Body to display Task Due Date
    cardBodyEl.append(pElDate);

    // Create paragraph for Task Description
    const pElDesc = $('<p>');
    pElDesc.addClass('card-text');
    pElDesc.text(task.description);

    // Append Paragraph element to Card Body to display Task Description
    cardBodyEl.append(pElDesc);

    // Create element for Delete Button
    const deleteButtonEl = $('<button>');
    deleteButtonEl.addClass('btn btn-danger btn-outline-light');
    deleteButtonEl.text('Delete');

    // Append Delete Button to Card Body El
    cardBodyEl.append(deleteButtonEl);

    // Append Card Body to Card El
    cardEl.append(cardBodyEl);

    // Append Cards to respective swinlane
    const taskStatus = task.status;

    if(taskStatus === 'todo'){
        cardsSwimLaneEl = $('#todo-cards');
    }else if(taskStatus === 'in-progress'){
        cardsSwimLaneEl = $('#in-progress-cards');
    }else{
        cardsSwimLaneEl = $('#done-cards');
    }

    cardsSwimLaneEl.append(cardEl);
    // Make cards draggable
    $('.task-card').draggable();

    // Make lanes droppable
    $('#in-progress').droppable({
        accept: ".task-card",
        drop: handleDrop
    });
    $('#done').droppable({
        accept: ".task-card",
        drop: handleDrop
    });

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

    const taskTitle = $('#taskTitle').val();
    const taskDueDate = $('#taskDueDate').val();
    const taskDescription = $('#taskDescription').val();

    //  Assign id to task
    const taskID = generateTaskId.call();

    // Set task related information to null
    $('#taskTitle').val('');
    $('#taskDueDate').val('');
    $('#taskDescription').val('');

    // Close the modal
    $('#formModal').modal('hide');
    // Define the taskInfo object
    const taskInfo = {
        id: taskID,
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        status: 'todo'
    };

    // Check if taskList Array exists in Local Storage
    const taskListArray = JSON.parse(localStorage.getItem('taskList'));
    if (taskListArray !== null) {
        taskList = taskListArray;
        taskList.push(taskInfo);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    } else {
        taskList.push(taskInfo);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }
    // Call createTaskCard function
    createTaskCard(taskInfo);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // Dragged Element Id
    const draggedElementId = ui.draggable.attr('data-id');
    // Retrieve the list of tasks from local storage
    taskList = JSON.parse(localStorage.getItem('taskList'))
    // Get id of dropped container where element was dragged into
    let droppedSwimLaneEl = ($(this).attr("id"));
    for (i = 0; i < taskList.length; i++) {
        const taskRef = taskList[i];
        const id = taskRef.id;
        if (id === draggedElementId) {
            // update status
            taskRef.status = droppedSwimLaneEl;
            // if dropped into done swimlane, update the card  background
            if (droppedSwimLaneEl === 'done') {
                // find dragged Element by data attribute data-id
                const draggedElement = $(`[data-id=${draggedElementId}]`)
                // remove class that begins with bg
                $(draggedElement).removeClass(function (index, className) {
                    return (className.match(/\bbg-\S+/g) || []).join(' ');
                });
                // add class 'bg-light'
                $(draggedElement).addClass('bg-light');
            }
        }
    }
    localStorage.setItem('taskList', JSON.stringify(taskList));
}



// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {


});

// Event listener on AddTasks button on Modal
submitTaskButtonEl.on('click', handleAddTask);