import { HttpInterceptor,HttpRequest, HttpHandler, HttpEvent, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginService } from "../services/security/login.service";
import { MessagesConstant } from "../utils/messages-constants";
import { MessagingNotification } from "../utils/messaging-notification";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  /**
   * Constructor de la clase.
   */
  constructor(private authService: LoginService) {}

  /**
   * Intercepta las peticiones enviadas al server.
   * 
   * @param request peticion enviada al servidor
   * @param next respuesta del servidor
   * @returns respuesta del servidor
   */
  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {        
        let errorMessage = "";
        // if true = client-side error else backend error
        errorMessage =
          error instanceof ErrorEvent
            ? `Error: ${error.error.message}`
            : (errorMessage = `Server-side error: ${error.status} ${error.message}`);
        switch (error.status) {
          case HttpStatusCode.BadRequest:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.BAD_REQUEST + error.error.message
            );
            break;
          case HttpStatusCode.Unauthorized:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.USER_AND_PASSWORD_WRONG
            );
            break;
          case HttpStatusCode.Forbidden:
            MessagingNotification.sessionExpired(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.FORBIDDEN
            ).then((response) => {              
              if (response) {
                this.authService.doLogout();
              }
            });
            break;
          case HttpStatusCode.NotFound:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.NOT_FOUND
            );
            break;
          case HttpStatusCode.InternalServerError:
            MessagingNotification.create(
              MessagingNotification.ERROR_TYPE,
              MessagesConstant.ERROR_TITLE,
              MessagesConstant.GENERIC_ERROR
            );
            break;
          default:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.BAD_REQUEST
            );
            break;
        }
        return throwError(errorMessage);
      })
    );
  }
}
