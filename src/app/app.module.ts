import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialExampleModule } from './material.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { GraphQLModule } from './@shared/graphql.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    ComponentsModule,
    GraphQLModule,
    MaterialExampleModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    MatFormFieldModule,
    MatTableModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PrivacyPolicyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
