import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { openAddTaskModal } from './addtask_modal';

let calendarEl = document.getElementById('calendar');

let calendar = new Calendar(calendarEl, {
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth'
  },
  dateClick: function(info) {
    openAddTaskModal(info.dateStr)
  }
});

calendar.render();

export function UpdateTasksInCalendar(tasks) {
    calendar.removeAllEvents();

    tasks.forEach(task => {
        let event = {
          title: task.text,
          start: task.date,
          end: task.endDate,
          extendedProps: { isChecked: task.isChecked }
        };
    
        calendar.addEvent(event);
    });
}