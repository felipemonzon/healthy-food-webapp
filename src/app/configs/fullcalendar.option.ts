import { CalendarOptions } from '@fullcalendar/angular';

export const CALENDAR_OPTIONS: CalendarOptions = {
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, timeGridDay'
    },
    buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: false,
    selectable: false,
    dayMaxEvents: true
};