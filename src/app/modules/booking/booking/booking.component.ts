import { Component, OnInit } from '@angular/core';
import { DateSelectArg, EventClickArg } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import { AppointmentService } from 'src/app/services/appointments/appoinment-service';
import { CALENDAR_OPTIONS } from 'src/app/configs/fullcalendar.option';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styles: [
  ]
})
export class BookingComponent implements OnInit {
  calendarOptions = CALENDAR_OPTIONS;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  /**
   * Consulta las citas disponibles y las agrega al calendario.
   */
  private getAppointments() {
    this.appointmentService.getAllAppointment().subscribe((response: EventInput[]) => {
      this.calendarOptions.events = response;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: "1",
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
}
