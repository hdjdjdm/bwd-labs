import { deleteTask, drag, toggleCheck } from "./taskManager";

window.onload = () => {
    const taskList = document.getElementById('taskList');
    const inProgressList = document.getElementById('inProgressList');
    const completedList = document.getElementById('completedList');

    if (taskList && inProgressList && completedList) {
        loadTasks();
    }
};

export function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskLists = {
        taskList: document.getElementById('taskList'),
        inProgressList: document.getElementById('inProgressList'),
        completedList: document.getElementById('completedList')
    };

    Object.values(taskLists).forEach(list => list.innerHTML = '<ul></ul>');

    tasks.forEach((task, index) => {
        const listItem = createTaskItem(task, index);
        const targetUl = taskLists[task.column].querySelector('ul');
        targetUl.appendChild(listItem);
    });
}

function createTaskItem(task, index) {
    const listItem = document.createElement('li');
    listItem.className = 'task';
    listItem.draggable = true;
    listItem.dataset.index = index;
    listItem.ondragstart = drag;

    listItem.appendChild(createCheckbox(task, index));
    listItem.appendChild(createTextSpan(task.text));
    listItem.appendChild(createDeleteButton(index));

    if (task.isChecked) {
        listItem.classList.add('checked');
    }

    return listItem;
}

function createCheckbox(task, index) {
    const checkbox = document.createElement('label');
    checkbox.className = 'customCheckbox';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = task.isChecked;
    input.dataset.index = index;
    input.addEventListener('change', toggleCheck);

    const span = document.createElement('span');
    span.className = 'checkboxImage';
    span.innerHTML = `
        <img class="empty" src="./assets/icons/cb_empty.svg" alt="cb_empty" id="svg" />
        <img class="hover" src="./assets/icons/cb_hover.svg" alt="cb_hover" id="svg" />
        <img class="complete" src="./assets/icons/cb_complete.svg" alt="cb_complete" id="svg" />
    `;

    checkbox.appendChild(input);
    checkbox.appendChild(span);

    return checkbox;
}


function createTextSpan(text) {
    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.title = text;
    textSpan.textContent = text;
    return textSpan;
}

function createDeleteButton(index) {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete_icon';
    deleteButton.innerHTML = '<img src="./assets/icons/delete.svg" alt="delete_icon" id="svg" />';
    deleteButton.addEventListener('click', () => deleteTask(index));
    return deleteButton;
}