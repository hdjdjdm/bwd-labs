import { addTask } from "./taskManager";

const addtask_modal = document.createElement('dialog');
addtask_modal.id = 'taskDialog';
addtask_modal.innerHTML = `
    <form id="addTaskForm" method="dialog">
        <h4>Добавить задачу</h4>
        <input 
            type="text"
            id="taskName"
            name="taskName"
            autoFocus
            placeholder="Введите название"
            required
            autocomplete="off"
        >
        <label for="taskDate">
            Дата начала
        </label>
        <input 
            type="date"
            id="taskDate"
            name="taskDate"
        >
        <label for="taskEndDate">
            Дата окончания
        </label>
        <input 
            type="date"
            id="taskEndDate"
            name="taskEndDate"
        >
        <div class="buttons">
            <button type="submit">
                <img src="./assets/icons/add.svg" alt="add_icon" id="svg" />
                Добавить задачу
            </button>
            <button id="closeDialog" type="button">Закрыть</button>
        </div>
    </form>
`;

document.body.appendChild(addtask_modal);

const openAddTaskModalButton = document.getElementById('addTaskButton')
const closeAddTaskModalButton = document.getElementById('closeDialog')
const addTaskForm = document.getElementById('addTaskForm');
if (addTaskForm) {
    addTaskForm.addEventListener('submit', addTask);
}

const taskNameInput = document.getElementById('taskName');
const taskDateInput = document.getElementById('taskDate');
const taskEndDateInput = document.getElementById('taskEndDate');

if (openAddTaskModalButton) {
    openAddTaskModalButton.addEventListener('click', () => {
        addtask_modal.showModal();
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    });

    closeAddTaskModalButton.addEventListener('click', () => {
        closeAddTaskModal();
    });

    addtask_modal.addEventListener('click', (event) => {
        if (event.target === addtask_modal) {
            closeAddTaskModal();
        }
    });
}

export function openAddTaskModal(selectedDate) {
    addtask_modal.showModal();
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    const taskDateInput = document.getElementById('taskDate');
    taskDateInput.value = selectedDate;
}

export function closeAddTaskModal() {
    taskNameInput.value = '';
    taskDateInput.value = '';
    taskEndDateInput.value = '';
    addtask_modal.close();
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}