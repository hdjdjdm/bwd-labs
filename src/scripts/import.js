import { loadTasks } from "./loadTasks";

importButton.addEventListener('click', () => {
    icsFileInput.click();
});

icsFileInput.addEventListener('change', async (event) => {
    if (!event.target.files.length) return;

    try {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const content = event.target.result;
            parseIcs(content);
        };

        await reader.readAsText(file);
    } catch (error) {
        console.error("Ошибка чтения файла:", error);
    }
});

function parseIcs(icsContent) {
    const lines = icsContent.split('\n');
    const events = [];
    let currentEvent = null;

    for (let line of lines) {
        if (line.startsWith('BEGIN:VEVENT')) {
            currentEvent = {
                text: '',
                date: '',
                endDate: '',
                isChecked: false,
                column: 'taskList'
            };
        } else if (currentEvent && line.startsWith('END:VEVENT')) {
            if (currentEvent.text && currentEvent.date && currentEvent.endDate) {
                events.push(currentEvent);
            }
            currentEvent = null;
        } else if (currentEvent) {
            const parts = line.split(':');
            const key = parts.shift().trim();
            const value = parts.join(':').trim();

            switch(key) {
                case 'DTSTART':
                    currentEvent.date = value.substring(0, 8);
                    break;
                case 'DTEND':
                    currentEvent.endDate = value.substring(0, 8);
                    break;
                case 'SUMMARY':
                    currentEvent.text = value;
                    break;
                default:
                    break;
            }
        }
    }

    saveEventsToLocalStorage(events.filter(e => e.text && e.date && e.endDate));
}

function saveEventsToLocalStorage(data) {
    localStorage.setItem('tasks', JSON.stringify(data));
    loadTasks();
    alert('События успешно импортированы!');
}