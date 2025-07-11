import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MenuComponent } from './components/menu/menu.component';
import { ngxUiLoaderConfig } from './configs/LoaderConfig';
import { LoginComponent } from './modules/security/login/login.component';
import { Role } from './security/enums/Role';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "menu", component: MenuComponent, children: [{
      path: "", loadChildren: () =>
        import("./components/menu/home.module").then(
          (home) => home.HomeModule
        ),
      }, 
    ], data: { role: Role.ADMIN }
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
