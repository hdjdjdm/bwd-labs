document.addEventListener('DOMContentLoaded', function() {
    const changeViewButton = document.querySelector('.changeViewButton');
    const taskTable = document.querySelector('table');
    const calendarElement = document.getElementById('calendar');
    const listIcon = document.getElementById('listIcon');
    const calendarIcon = document.getElementById('calendarIcon');

    if (changeViewButton) {
        changeViewButton.addEventListener('click', () => {
            if (taskTable.classList.contains('hidden')) {
                taskTable.classList.remove('hidden');
                calendarElement.classList.remove('showCalendar');
                listIcon.style.display = 'block';
                calendarIcon.style.display = 'none';
            } else {
                taskTable.classList.add('hidden');
                calendarElement.classList.add('showCalendar');
                listIcon.style.display = 'none';
                calendarIcon.style.display = 'block';
            }
        });
    }
});