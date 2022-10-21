import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/security/user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Ruta base para el dominio de usuarios.
   */
  private userPath: string = `${environment.baseUrl}${environment.users}`;

  /**
   * Constructor de la clase.
   * 
   * @param httpClient htt client
   */
  constructor(private httpClient: HttpClient) { }

  /**
  * Consulta todas las sucursales.
  */
  public getAlUser() {
    return this.httpClient.get<UserModel[]>(this.userPath);
  }
}
