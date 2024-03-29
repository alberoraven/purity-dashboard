import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { VendorListComponent, VendorAddDialogue } from '../../pages/vendor-list/vendor-list.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { BookingDetails } from '../../pages/bookingDetails/booking-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MaterialExampleModule } from '../../material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GraphQLModule } from '../../@shared/graphql.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VendorListDialogue, VendorListTableComponent } from '../../pages/vender-list-table/vender-list-table.component';
import { ServiceDetailDialogue, ServiceDetailsComponent } from '../../pages/serviceDetails/service-details.component';
import { OfferDetailDialogue, OfferDetailsComponent } from '../../pages/offerDetails/offer-details.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialExampleModule,
    NgbModule,
    MatSortModule,
    ClipboardModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    GraphQLModule,
    MatPaginatorModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    BookingDetails,
    VendorListTableComponent,
    ServiceDetailsComponent,
    ServiceDetailDialogue,
    VendorListDialogue,
    OfferDetailsComponent,
    OfferDetailDialogue,
    IconsComponent,
    VendorAddDialogue,
    VendorListComponent,
  ], exports: [
    MatFormFieldModule
  ]
})

export class AdminLayoutModule { }
