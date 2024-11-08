import { closeAddTaskModal } from "./addtask_modal";
import { loadTasks } from "./loadTasks";

export function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

export function addTask(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value.trim();
    let taskDate = document.getElementById('taskDate').value;
    let taskEndDate = document.getElementById('taskEndDate').value;

    if (taskName === '') {
        alert('Пожалуйста, введите название задачи!');
        return;
    }

    if (!taskDate) {
        const today = new Date();
        taskDate = today.toISOString().substring(0, 10);
    }

    if (!taskEndDate || taskEndDate < taskDate) {
        taskEndDate = taskDate;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskExists = tasks.some(task => task.text.toLowerCase() === taskName.toLowerCase());

    if (taskExists) {
        alert('Задача с таким названием уже существует!');
    } else {
        tasks.push({
            text: taskName,
            date: taskDate,
            endDate: taskEndDate,
            isChecked: false,
            column: 'taskList'
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    closeAddTaskModal();
    loadTasks();
}

export function toggleCheck(event) {
    const index = event.target.dataset.index;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks[index].isChecked = !tasks[index].isChecked;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskElement = event.target.closest('.task');

    if (tasks[index].isChecked) {
        taskElement.classList.add('checked');
    } else {
        taskElement.classList.remove('checked');
    }
}

let draggedTaskIndex;

export function allowDrop(event) {
    event.preventDefault();
}
window.allowDrop = allowDrop;

export function drag(event) {
    draggedTaskIndex = event.target.dataset.index;
}
window.drag = drag;

export function drop(event) {
    event.preventDefault();

    const targetColumn = event.target.closest('td').id;
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (draggedTaskIndex !== undefined && targetColumn) {
        tasks[draggedTaskIndex].column = targetColumn;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        loadTasks();
    }
}
window.drop = drop;

