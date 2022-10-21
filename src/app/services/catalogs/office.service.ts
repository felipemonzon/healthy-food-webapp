import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfficeModel } from 'src/app/models/catalog/office.model';
import { MessagesConstant } from 'src/app/utils/messages-constants';
import { MessagingNotification } from 'src/app/utils/messaging-notification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  /**
   * Ruta base para el dominio de sucursales.
   */
  private officePath: string = `${environment.baseUrl}${environment.offices}`;
  /**
   * Ruta base para modificar datos de las sucursales.
   */
  private officeDataPath: string = `${this.officePath}/`;

  /**
   * Constructor de la clase.
   * 
   * @param httpClient htt client
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta todas las sucursales.
   */
  public getAllOffices() {
    return this.httpClient.get<OfficeModel[]>(this.officePath);
  }

  /**
   * Consulta sucursales por nombre, teléfono, coordenadas o dirección.
   *
   * @param search parámetro de búsqueda
   * @returns lista de sucursales encontrada
   */
  public findBy(search: string) {
    return this.httpClient.get<OfficeModel[]>(
      this.officeDataPath + search.toLowerCase()
    );
  }

  /**
   * Registra una sucursal.
   *
   * @param office modelo de sucursal
   * @returns status 201 si el sucursal se registro con éxito
   */
  public save(office: OfficeModel) {
    return this.httpClient
      .post<HttpResponse<any>>(this.officePath, office, {
        observe: "response",
      })
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === HttpStatusCode.Created) {
          MessagingNotification.reaload(
            MessagingNotification.SUCCESS_TYPE,
            MessagesConstant.SUCCESS_TITLE,
            MessagesConstant.SAVE_SUCCESS
          );
        } else {
          MessagingNotification.create(
            MessagingNotification.WARNING_TYPE,
            response.body.code as string,
            response.body.message as string
          );
        }
      });
  }

  /**
   * Actualiza los datos de una sucursal.
   *
   * @param office modelo de sucursal
   * @returns status 204 si la sucursal se actualizo con éxito
   */
  public update(office: OfficeModel) {
    return this.httpClient
      .put<HttpResponse<any>>(this.officeDataPath + office.id, office, {
        observe: "response",
      })
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === HttpStatusCode.NoContent) {
          MessagingNotification.reaload(
            MessagingNotification.SUCCESS_TYPE,
            MessagesConstant.SUCCESS_TITLE,
            MessagesConstant.UPDATE_SUCCESS
          );
        } else {
          MessagingNotification.create(
            MessagingNotification.WARNING_TYPE,
            response.body.code as string,
            response.body.message as string
          );
        }
      });
  }

  /**
   * Elimina los datos de una sucursal.
   *
   * @param id identificador de la sucursal
   * @returns status 200 si la sucursal se elimino con éxito
   */
  public delete(id: string) {
    return this.httpClient
      .delete<HttpResponse<any>>(this.officeDataPath + id, {
        observe: "response",
      })
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === HttpStatusCode.NoContent) {
          MessagingNotification.reaload(
            MessagingNotification.SUCCESS_TYPE,
            MessagesConstant.SUCCESS_TITLE,
            MessagesConstant.DELETE_SUCCESS
          );
        } else {
          MessagingNotification.create(
            MessagingNotification.WARNING_TYPE,
            response.body.code as string,
            response.body.message as string
          );
        }
      });
  }
}
