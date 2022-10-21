import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/HttpInterceptorService';
import { LoginComponent } from './modules/users/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { LetterOnlyeDirective } from './directives/letter-only.directive';
import { LetterNumberOnlyDirective } from './directives/letter-number-only.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgSelectModule } from '@ng-select/ng-select';
import { OfficesRetrieveComponent } from './modules/catalog/offices/offices-retrieve/offices-retrieve.component';
import { OfficeComponent } from './modules/catalog/offices/office/office.component';
import { SupplierRetrieveComponent } from './modules/catalog/suppliers/supplier-retrieve/supplier-retrieve.component';
import { SupplierComponent } from './modules/catalog/suppliers/supplier/supplier.component';
import { ParameterRetrieveComponent } from './modules/administration/parameters/parameter-retrieve/parameter-retrieve.component';
import { ParameterComponent } from './modules/administration/parameters/parameter/parameter.component';
import { UnitComponent } from './modules/administration/units/unit/unit.component';
import { UnitRetrieveComponent } from './modules/administration/units/unit-retrieve/unit-retrieve.component';
import { UserComponent } from './modules/administration/users/user/user.component';
import { UserRetrieveComponent } from './modules/administration/users/user-retrieve/user-retrieve.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterOnlyeDirective,
    NumberOnlyDirective,
    LetterNumberOnlyDirective,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    MenuComponent,
    LoginComponent,
    OfficesRetrieveComponent,
    OfficeComponent,
    SupplierRetrieveComponent,
    SupplierComponent,
    ParameterRetrieveComponent,
    ParameterComponent,
    UnitComponent,
    UnitRetrieveComponent,
    UserComponent,
    UserRetrieveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
