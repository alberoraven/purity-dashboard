import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { VendorListComponent } from '../../pages/vendor-list/vendor-list.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { BookingDetails } from '../../pages/bookingDetails/booking-details.component';
import { LogoutComponent } from '../../pages/logout/logout.component';
import { VendorListTableComponent } from '../../pages//vender-list-table/vender-list-table.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'bookingList', component: BookingDetails },
    { path: 'icons', component: IconsComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'vendor-List', component: VendorListTableComponent },
    { path: 'assign-a-vendor', component: VendorListComponent }
];
