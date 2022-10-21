import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRoutes } from './home-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(HomeRoutes),
    NgbModule
  ]
})
export class HomeModule { }
