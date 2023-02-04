import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { VendorListComponent } from '../../pages/vendor-list/vendor-list.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { BookingDetails } from '../../pages/bookingDetails/booking-details.component';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'bookingDetails', component: BookingDetails },
    { path: 'icons', component: IconsComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'vendor-list', component: VendorListComponent }
];
