import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NewBookingsComponent } from '../../pages/new-bookings/new-bookings.component';
import { AdminProfileComponent } from '../../pages/admin-profile/admin-profile.component';
import { CompletedServices } from '../../pages/completed-services/completed-services.component';
import { LogoutComponent } from '../../pages/logout/logout.component';
import { VendorListTableComponent } from '../../pages//vender-list-table/vender-list-table.component';
import { ServiceDetailsComponent } from '../../pages/serviceDetails/service-details.component';
import { OfferDetailsComponent } from '../../pages/offerDetails/offer-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin-profile', component: AdminProfileComponent },
    { path: 'completed-services', component: CompletedServices },
    { path: 'icons', component: IconsComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'vendor-List', component: VendorListTableComponent },
    { path: 'service-details', component: ServiceDetailsComponent },
    { path: 'offer-details', component: OfferDetailsComponent },
    { path: 'new-bookings', component: NewBookingsComponent },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
