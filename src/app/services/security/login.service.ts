import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/models/security/user-model";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  /**
   * URL de login.
   */
  private loginUrl = `${environment.baseUrl}${environment.login}`;
  /**
   * Authorization header.
   */
  private authorization = "authorization";

  /**
   * Constructor.
   * 
   * @param httpClient cliente http
   * @param router ruteo
   */
  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
   * Ejecuta servicio de inicio de sesión.
   * 
   * @param user {@interface UserModel} user model
   * @returns agrega JWT al header de authorization
   */
  login(user: UserModel) {
    return this.httpClient
      .post(this.loginUrl, user, { observe: "response" })
      .pipe(
        map((response: HttpResponse<any>) => {          
          localStorage.setItem(
            this.authorization,
            response.headers.get(this.authorization)!
          );
          localStorage.setItem("displayName", response.body.displayName);
        })
      );
  }

  /**
   * Cierra sesión.
   */
  logout() {
    localStorage.removeItem(this.authorization);
  }

  /**
   * Consulta el token de sesión.
   * 
   * @returns token de sesión
   */
  getToken() {
    return localStorage.getItem(this.authorization);
  }

  /**
   * valida si esta el token en sesión.
   */
  get isLoggedIn(): boolean {
    return localStorage.getItem(this.authorization) !== null ? true : false;
  }

  /**
   * Cierra la sesión.
   */
  doLogout() {
    let removeToken = localStorage.removeItem(this.authorization);
    if (removeToken == null) {
      this.router.navigate(["login"]);
    }
  }
}
