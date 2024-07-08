const $started = $('.started');
const $inProgress = $('.in-progress');
const $done = $('.done');
const taskForm = document.querySelector('#task-form');
const $saveBtn = $('#save-Btn');

// Retrieve tasks and nextId from localStorage
function getTaskData() {
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    return taskList || [];
}

//Function get output Tasks
function outputTasks() {
    const tasks = getTaskData();
    $done.empty();
    $inProgress.empty();
    $started.empty();
    tasks.forEach(function(taskObj){//how the task gets added to the browser
        const $taskEl = $(`
            <article data-id='${taskObj.id}' class="bg-white border border-dark-subtle p-3 m-4">
                <h5>Task Title: ${taskObj.title}</h5>
                <p>Description: ${taskObj.info}</p>
                <p>Due Date: ${taskObj.dueDate}</p>
                <button class='btn bg-danger text-light'>Delete</button>
            </article>   
        `);
        if (taskObj.done) {
            $done.append($taskEl); 
            $taskEl.addClass('done');//This helps with adding the color in CSS
        } else if (taskObj.inProgress) {
            $inProgress.append($taskEl);
            $taskEl.addClass('inProgress');
        }   else {
            $started.append($taskEl);
            $taskEl.addClass('started');
        }
        
    })
    setUpDraggable();
}


// Todo: create a function to generate a unique task id
function generateTaskId() {
    const min = Math.pow(10, 14);
    const max = Math.pow(10, 15) - 1;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomNumber;

}
// Todo: create a function to create a task card
function createTaskCard() {
    const taskID = generateTaskId();
    const $taskTitle = $('#task-name');
    const $taskInfo = $('#description-text');
    const $dueDate = $('#deadline');

    const newTask = {
        id: taskID,
        title: $taskTitle.val(),
        info: $taskInfo.val(),
        dueDate: $dueDate.val(),
        done: false,
        inProgress: false,
        started: true
    };
    const taskList = getTaskData();
    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    $taskTitle.val('');
    $taskInfo.val('');
    $dueDate.val('');
    // to hide the modal after submission
    $('#formModal').modal('hide');

    outputTasks();

}
// Todo: create a function to render the task list and make cards draggable
function handleDrop(eventObj, ui) {
    const area = $(eventObj.target);
    const article = $(ui.draggable[0]);
    const articleID = article.data('id');
    const tasks = getTaskData();

    const task = tasks.find(function(taskObj){
        if (taskObj.id === articleID) return true;
    });
    console.log(area);
    article.removeClass('started inProgress done');
    if (area.hasClass('started')) {
        task.started = true;
        task.inProgress = false;
        task.done = false;
        article.addClass('started');
        
    }
    if (area.hasClass('in-progress')) {
        task.started = false;
        task.inProgress = true;
        task.done = false;
        article.addClass('inProgress');
    }
    if (area.hasClass('done')) {
        task.started = false;
        task.inProgress = false;
        task.done = true;
        article.addClass('done');
    }
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    area.append(article);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(eventObj){
    const btn = $(eventObj.target);
    const taskID = btn.parent('article').data('id');

    const tasks = getTaskData();
    const filtered = tasks.filter(function(taskObj) {
        if (taskObj.id !== taskID) return true
    });
    localStorage.setItem('tasks', JSON.stringify(filtered));
    btn.parent('article').remove();
}

function setUpDraggable() {
    $('article').draggable({
        opacity: 0.7,
        zIndex: 500,
        helper: function(eventObj) {
            const el = $(eventObj.target);
            let clone;
            if (el.is('article')){
                clone = el.clone();
            } else {
                clone = el.closest('article').clone();
            }
            clone.css('width', el.outerWidth());
            return clone;
        }
    });
}

function init() {
    $('#deadline').datepicker({
        minDate: 0
    });
    $('main').on('click', 'button.bg-danger', handleDeleteTask);
    $saveBtn.on('click', createTaskCard);
    outputTasks();
    $('.card-body').droppable({
        accept: 'article',
        drop: handleDrop//lets you drop elements into boxes
    });
}
init();