import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/configs/auth.guard';
import { ParameterRetrieveComponent } from 'src/app/modules/administration/parameters/parameter-retrieve/parameter-retrieve.component';
import { ProfileRetrieveComponent } from 'src/app/modules/administration/profiles/profile-retrieve/profile-retrieve.component';
import { UnitRetrieveComponent } from 'src/app/modules/administration/units/unit-retrieve/unit-retrieve.component';
import { UserRetrieveComponent } from 'src/app/modules/administration/users/user-retrieve/user-retrieve.component';
import { BookingComponent } from 'src/app/modules/booking/booking/booking.component';
import { OfficesRetrieveComponent } from 'src/app/modules/catalog/offices/offices-retrieve/offices-retrieve.component';
import { SupplierRetrieveComponent } from 'src/app/modules/catalog/suppliers/supplier-retrieve/supplier-retrieve.component';
import { Role } from 'src/app/security/enums/Role';

export const HomeRoutes: Routes = [
    { path: '', component: OfficesRetrieveComponent, canActivate: [AuthGuard] },
    { path: 'booking/retrieve', component: BookingComponent, canActivate: [AuthGuard]},

    { path: 'offices/retrieve', component: OfficesRetrieveComponent, canActivate: [AuthGuard], 
        data: {role: Role.ADMIN}
    },
    { path: 'suppliers/retrieve', component: SupplierRetrieveComponent, canActivate: [AuthGuard]},

    { path: 'users/retrieve', component: UserRetrieveComponent, canActivate: [AuthGuard]},
    { path: 'profiles/retrieve', component: ProfileRetrieveComponent, canActivate: [AuthGuard]},
    { path: 'parameters/retrieve', component: ParameterRetrieveComponent, canActivate: [AuthGuard]},
    { path: 'units/retrieve', component: UnitRetrieveComponent, canActivate: [AuthGuard]},
];
