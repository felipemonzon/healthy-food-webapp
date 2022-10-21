import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Unit } from "src/app/models/configuration/unit.model";
import { MessagesConstant } from "src/app/utils/messages-constants";
import { MessagingNotification } from "src/app/utils/messaging-notification";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UnitService {
  /**
   * Ruta base del servicio de unidades.
   */
  private unitBasePath = `${environment.baseUrl}${environment.units}`;
  /**
   * Ruta de la API de unidades
   */
  private unitsDataPath = `${this.unitBasePath}/`;

  /** Constructor */
  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta todos las unidades.
   */
  public getAllUnits() {
    return this.httpClient.get<Unit[]>(this.unitBasePath);
  }

  /**
   * Consulta unidades por id, nombre o abreviatura.
   *
   * @param search parámetro de búsqueda
   * @returns lista de parámetros encontrada
   */
  public findBy(search: string) {
    return this.httpClient.get<Unit[]>(this.unitsDataPath + search.toLowerCase());
  }

  /**
   * Registra una unidad de medida.
   *
   * @param unit modelo de unidad de medida
   * @returns status 201 si la unidad se registro con éxito
   */
  public save(unit: Unit) {
    return this.httpClient
      .post<HttpResponse<any>>(this.unitBasePath, unit, {
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
   * Actualiza los datos de un parámetro.
   *
   * @param unit modelo de unidad de medida
   * @returns status 204 si la unidad se actualizo con éxito
   */
  public update(unit: Unit) {
    return this.httpClient
      .put<HttpResponse<any>>(this.unitsDataPath + unit.id, unit, {
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
   * Elimina los datos de una unidad.
   *
   * @param id identificador de la unidad
   * @returns status 204 si la unidad se elimino con éxito
   */
  public delete(id: string) {
    return this.httpClient
      .delete<HttpResponse<any>>(this.unitsDataPath + id, {
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
