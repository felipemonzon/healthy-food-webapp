import { Injectable } from '@angular/core';

@Injectable()
export class MessagesConstant {
    // TITLES
    static WARNING_TITLE = '¡Advertencia!';
    static ERROR_TITLE = '¡Error!';
    static SUCCESS_TITLE = '¡Éxito!';
    // MESSAGE
    static USER_AND_PASSWORD_WRONG = "Usuario Y/o Contraseña Incorrecta.";
    static GENERIC_ERROR = 'Ocurrio un Error. \n ¡Contacte con el Administrador!';
    static NOT_FOUND = 'Servicio no Disponible';
    static FORBIDDEN = '¡No Tiene los Permisos Necesarios Para Seguir Navegando!';
    static BAD_REQUEST = "Ocurrio un Error al Enviar los Datos. ";
    //SUCCESS PROCESS
    static SAVE_SUCCESS = 'Datos Registrados con Éxito';
    static UPDATE_SUCCESS = 'Datos Actualizados con Éxito';
    static DELETE_SUCCESS = 'Datos Eliminados con Éxito';

    static SUBSCRIPTION_SUCCESS_TITLE = 'Suscripción Realizada con éxito';
    static SUBSCRIPTION_SUCCESS_MESSAGE = 'Para una aclaración futura conserve el siguiente folio: ';

    static DELETE_USER_QUESTION = '¿Deseas Eliminar el Usuario?';
    static DELETE_OFFICE_QUESTION = '¿Deseas Eliminar la Sucursal?';
    static DELETE_SUPPLIER_QUESTION = '¿Deseas Eliminar el Proveedor?';
    static DELETE_PARAMETER_QUESTION = '¿Deseas Eliminar el Parámetro?';
    static DELETE_UNIT_QUESTION = '¿Deseas Eliminar la Unidad?';
    static DELETE_INGREDIENT_QUESTION = '¿Deseas Eliminar el Ingrediente?';
    static DELETE_DISHES_QUESTION = '¿Deseas Eliminar el Platillo?';
    static DELETE_SUBURB_QUESTION = '¿Deseas Eliminar la Colonia?';
    static DELETE_MEAL_SCHEDULE_QUESTION = '¿Deseas Eliminar el Platillo de la Agenda?';
    static DATE_VALIDATION = 'Campos Vacios o Formato de Fechas No Valido';
}