import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EventInput } from '@fullcalendar/angular';

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  /**
   * Ruta base de citas.
   */
  private appointmentBasePath = `${environment.baseUrl}${environment.appointments}`;
  /**
   * Ruta de la API de citas
   */
  private sappointmentDataPath = `${this.appointmentBasePath}/`;

  /** Constructor */
  constructor(private httpClient: HttpClient) {}

  /**
   * Consulta todos las citas.
   */
  public getAllAppointment() {
    return this.httpClient.get<EventInput[]>(this.appointmentBasePath);
  }
}
