import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Parameter } from "src/app/models/configuration/parameter.model";
import { MessagesConstant } from "src/app/utils/messages-constants";
import { MessagingNotification } from "src/app/utils/messaging-notification";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ParameterService {
  /**
   * Ruta base de parámetros.
   */
  private parameterPath = `${environment.baseUrl}${environment.parameters}`;
  /**
   * Ruta de la API de parámetros
   */
  private parameterDataPath = `${this.parameterPath}/`;

  /** Constructor */
  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta todos los parámetros.
   */
  public getAllParameters() {
    return this.httpClient.get<Parameter[]>(this.parameterPath);
  }

  /**
   * Consulta parámetros por id, nombre o valor.
   *
   * @param search parámetro de búsqueda
   * @returns lista de parámetros encontrada
   */
  public findBy(search: string) {
    return this.httpClient.get<Parameter[]>(
      this.parameterDataPath + search.trim()
    );
  }

  /**
   * Registra un parámetro.
   *
   * @param parameter modelo de parámetro
   * @returns status 201 si el parámetro se registro con éxito
   */
  public save(parameter: Parameter) {
    return this.httpClient
      .post<HttpResponse<any>>(this.parameterPath, parameter, {
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
   * @param parameter modelo de parámetros
   * @returns status 204 si el parámetros se actualizo con éxito
   */
  public update(parameter: Parameter) {
    return this.httpClient
      .put<HttpResponse<any>>(this.parameterDataPath + parameter.id, parameter, {
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
   * Elimina los datos de un parámetro.
   *
   * @param id identificador de el parámetro
   * @returns status 204 si el parámetro se elimino con éxito
   */
  public delete(id: string) {
    return this.httpClient
      .delete<HttpResponse<any>>(this.parameterDataPath + id, {
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
