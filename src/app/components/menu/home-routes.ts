import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/configs/auth.guard';
import { ParameterRetrieveComponent } from 'src/app/modules/administration/parameters/parameter-retrieve/parameter-retrieve.component';
import { UnitRetrieveComponent } from 'src/app/modules/administration/units/unit-retrieve/unit-retrieve.component';
import { OfficesRetrieveComponent } from 'src/app/modules/catalog/offices/offices-retrieve/offices-retrieve.component';
import { SupplierRetrieveComponent } from 'src/app/modules/catalog/suppliers/supplier-retrieve/supplier-retrieve.component';

export const HomeRoutes: Routes = [
    { path: '', component: OfficesRetrieveComponent, canActivate: [AuthGuard] },
    { path: 'offices/retrieve', component: OfficesRetrieveComponent, canActivate: [AuthGuard]},
    { path: 'suppliers/retrieve', component: SupplierRetrieveComponent, canActivate: [AuthGuard]},
    { path: 'parameters/retrieve', component: ParameterRetrieveComponent, canActivate: [AuthGuard]},
    { path: 'units/retrieve', component: UnitRetrieveComponent, canActivate: [AuthGuard]},
];
