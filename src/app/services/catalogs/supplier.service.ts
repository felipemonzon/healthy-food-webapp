import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from 'src/app/models/catalog/supplier-model';
import { MessagesConstant } from 'src/app/utils/messages-constants';
import { MessagingNotification } from 'src/app/utils/messaging-notification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  /**
   * Ruta base de proveedores.
   */
   private supplierBasePath = `${environment.baseUrl}${environment.suppliers}`;
   /**
    * Ruta de la API de proveedores
    */
   private supplierDataPath = `${this.supplierBasePath}/`;;
 
   /** Constructor */
   constructor(private httpClient: HttpClient) {}
 
   /**
    * Consulta todos los proveedores.
    */
   public getAllSuppliers() {
     return this.httpClient.get<Supplier[]>(this.supplierBasePath);
   }
 
   /**
    * Consulta proveedores por nombre, teléfono, coordenadas o dirección.
    *
    * @param search parámetro de búsqueda
    * @returns lista de proveedores encontrada
    */
   public findBy(search: string) {
     return this.httpClient.get<Supplier[]>(
       this.supplierDataPath + search.toLowerCase()
     );
   }
 
   /**
    * Registra un proveedor.
    *
    * @param supplier modelo de proveedor
    * @returns status 201 si el proveedor se registro con éxito
    */
   public save(supplier: Supplier) {
     return this.httpClient
       .post<HttpResponse<any>>(this.supplierDataPath, supplier, {
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
    * Actualiza los datos de un proveedor.
    *
    * @param supplier modelo de proveedor
    * @returns status 204 si el proveedor se actualizo con éxito
    */
   public update(supplier: Supplier) {
     return this.httpClient
       .put<HttpResponse<any>>(this.supplierDataPath + supplier.id, supplier, {
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
    * Elimina los datos de un proveedor.
    *
    * @param id identificador de el proveedor
    * @returns status 204 si el proveedor se elimino con éxito
    */
   public delete(id: string) {
     return this.httpClient
       .delete<HttpResponse<any>>(this.supplierDataPath + id, {
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
