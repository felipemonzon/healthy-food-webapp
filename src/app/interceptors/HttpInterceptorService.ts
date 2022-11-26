import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SecurityUtilities } from "../security/utils/security.utils";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    /**
     * Prefijo de token.
     */
    private readonly BEARER_TOKEN = "Bearer ";

    /**
     * Constructor e la clase.
     * @param loginService servicio de autenticación
     */
    constructor() { }

    /**
     * Intercepta las peticiones enviadas al server.
     * 
     * @param request petición enviada al server
     * @param next handler
     * @returns next handle
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${SecurityUtilities.getToken()}`,
            }
        });
        return next.handle(request);
    }
}