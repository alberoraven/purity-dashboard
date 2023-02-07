import { Component, Inject, OnInit } from '@angular/core';
import * as Query from '../../@shared/queries';
import { nhost } from '../../@shared/global';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface DialogData {
  vendorList: any;
  name: string;
  bookingId: any;
}

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  public unassignedUser: any;
  public vendorList: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.getUnassignedUserList();
    this.getVendorList()
  }


  async getUnassignedUserList() {

    const { data, error } = await nhost.graphql.request(Query.UnAssignedUsers)
    if (data) {
      this.unassignedUser = [...(data.active_bookings)]
    }
  }
  async getVendorList() {
    const { data, error } = await nhost.graphql.request(Query.vendorList)
    if (data) {
      [...(data.vendor_profiles)].forEach(res => {
        if (res.is_available) {
          this.vendorList = [...(data.vendor_profiles)];
        }
      })
    }
  }

  openDialog(user_id, bookingId): void {
    const dialogRef = this.dialog.open(VendorAddDialogue, {
      data: { name: user_id, vendorList: this.vendorList, bookingId: bookingId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

@Component({
  selector: 'vendor-add-dialogue',
  templateUrl: 'vendor-add-dialogue.html',
})
export class VendorAddDialogue {
  constructor(
    public dialogRef: MatDialogRef<VendorAddDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }
  selectedVendor: string;
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  emailId;
  status;
  bookingId;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.data?.vendorList.filter(option => option.email.toLowerCase().includes(filterValue));
  }

  getPosts(emailId) {
    this.emailId = emailId;
    this.bookingId = this.data.bookingId
  }
  async onNoClick() {
    const { data, error } = await nhost.graphql.request(Query.UpdateUser(this.bookingId, this.emailId))
    if (data) {
      this.status = [data]
    }
    this.dialogRef.close();
  }
  eventSelection(event) {
    this.selectedVendor = event.date
  }
}