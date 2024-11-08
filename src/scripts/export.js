import { ICalCalendar } from 'ical-generator';

function exportToICS(data) {
    const cal = new ICalCalendar({ domain: 'bwdlabs.com', name: 'COOLTASKS' });

    data.forEach((item) => {
        const startDate = new Date(item.date);
        const endDate = new Date(item.endDate);

        cal.createEvent({
            start: startDate,
            end: endDate,
            summary: item.text,
            uid: `${Math.random().toString(36).substring(7)}@example.com`,
            sequence: 0,
            status: 'confirmed',
            transparency: 'opaque'
        });
    });

    const icsContent = cal.toString();

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

exportButton.addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('tasks'));
    exportToICS(data);
});