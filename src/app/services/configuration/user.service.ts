import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInitialModel } from "src/app/models/administration/user.initial.model";
import { UserModel } from "src/app/models/security/user-model";
import { MessagesConstant } from "src/app/utils/messages-constants";
import { MessagingNotification } from "src/app/utils/messaging-notification";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  /**
   * Ruta base para el dominio de usuarios.
   */
  private userPath: string = `${environment.baseUrl}${environment.users}`;
  /**
   * Ruta de la API de usuarios
   */
  private userDataPath = `${this.userPath}/`;
  /**
   * Ruta de la API de usuarios para datos iniciales
   */
  private userInitialDataPath = `${this.userPath}${environment.initial}`;
  /**
   * Constructor de la clase.
   *
   * @param httpClient htt client
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Consulta todas las sucursales.
   */
  public getAlUser() {
    return this.httpClient.get<UserModel[]>(this.userPath);
  }

  /**
   * Consulta los datos iniciales para la página de creación de usuarios.
   * @returns lista de sucursales y perfiles.
   */
  public initialData(){
    return this.httpClient.get<UserInitialModel>(this.userInitialDataPath);
  }

  /**
   * Consulta usuarios por email, nombre o teléfono.
   *
   * @param search parámetro de búsqueda
   * @returns lista de usuarios encontrada
   */
  public findUserBy(search: string) {
    return this.httpClient.get<UserModel[]>(this.userDataPath + search);
  }

  /**
   * Registra un usuario.
   *
   * @param user modelo de usuario
   * @returns status 201 si el usuario se registro con éxito
   */
  public save(user: UserModel) {
    return this.httpClient
      .post<HttpResponse<any>>(this.userPath, user, {
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
   * Actualiza los datos de un usuario.
   *
   * @param user modelo de usuario
   * @returns status 204 si el usuario se actualizo con éxito
   */
  public update(user: UserModel) {
    return this.httpClient
      .put<HttpResponse<any>>(this.userDataPath + user.id, user, {
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
   * Elimina los datos de un usuario.
   *
   * @param id identificador de usuario
   * @returns status 200 si el usuario se elimino con éxito
   */
  public delete(id: string) {
    return this.httpClient
      .delete<HttpResponse<any>>(this.userDataPath + id, {
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
