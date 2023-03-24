import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { MaterialExampleModule } from '../../material.module';
import { UserLayoutRoutes } from './user-layout.routing';
import { GraphQLModule } from '../../@shared/graphql.module';
import { UserHomeComponent } from '../../pages/user-home/user-home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
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
    UserHomeComponent
  ], 
  exports: [
    MatFormFieldModule
  ]
})

export class UserLayoutModule { }
