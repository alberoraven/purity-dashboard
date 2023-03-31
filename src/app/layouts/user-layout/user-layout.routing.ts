import { Routes } from '@angular/router';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { MyBookingsComponent } from 'src/app/pages/my-bookings/my-bookings.component';
import { MyProfileComponent } from 'src/app/pages/my-profile/my-profile.component';
import { ServiceDetailsComponent } from 'src/app/pages/service-details/service-details.component';
import { UserHomeComponent } from 'src/app/pages/user-home/user-home.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

export const UserLayoutRoutes: Routes = [
    { path: 'home', component: UserHomeComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: 'my-bookings', component: MyBookingsComponent},
    { path: 'service-details/:id', component: ServiceDetailsComponent },
    { path: 'logout', component: LogoutComponent },
    {
        path: '**',
        redirectTo: 'home'
    }
];
