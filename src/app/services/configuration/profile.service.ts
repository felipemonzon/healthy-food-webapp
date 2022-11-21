import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthorityModel } from "src/app/models/administration/authority.model";
import { MessagesConstant } from "src/app/utils/messages-constants";
import { MessagingNotification } from "src/app/utils/messaging-notification";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  /**
   * Ruta base para el dominio de perfiles.
   */
  private profilesPath: string = `${environment.baseUrl}${environment.profiles}`;
  /**
   * Ruta de la API de perfiles
   */
  private profileDataPath = `${this.profilesPath}/`;

  /**
   * Constructor de la clase.
   *
   * @param httpClient htt client
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Consulta todas las perfiles.
   */
  public getAlProfile() {
    return this.httpClient.get<AuthorityModel[]>(this.profilesPath);
  }

  /**
   * Consulta perfiles por nombre o valor.
   *
   * @param search parámetro de búsqueda
   * @returns lista de perfiles encontrada
   */
  public findProfileBy(search: string) {
    return this.httpClient.get<AuthorityModel[]>(this.profileDataPath + search);
  }

  /**
   * Registra un perfil.
   *
   * @param profile modelo de perfil
   * @returns status 201 si el perfil se registro con éxito
   */
  public save(profile: AuthorityModel) {
    return this.httpClient
      .post<HttpResponse<any>>(this.profilesPath, profile, {
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
   * Actualiza los datos de un perfil.
   *
   * @param profile modelo de perfil
   * @returns status 204 si el perfil se actualizo con éxito
   */
  public update(profile: AuthorityModel) {
    return this.httpClient
      .put<HttpResponse<any>>(this.profileDataPath + profile.id, profile, {
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
   * Elimina los datos de un perfil.
   *
   * @param id identificador de perfil
   * @returns status 200 si el perfil se elimino con éxito
   */
  public delete(id: string) {
    return this.httpClient
      .delete<HttpResponse<any>>(this.profileDataPath + id, {
        observe: "response",
      })
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === HttpStatusCode.Ok) {
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
