import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as Query from '../../@shared/queries';
import { nhost } from '../../@shared/global';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface DialogData {
  vendorList: string;
  name: string;
}

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  animal: string;
  name: string;

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
      this.vendorList = [...(data.vendor_profiles)];
    }
  }

  openDialog(user_id): void {
    const dialogRef = this.dialog.open(VendorAddDialogue, {
      data: { name: user_id, vendorList: this.vendorList },
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
  public vendorList

  onNoClick(): void {
    this.dialogRef.close();
  }
  eventSelection(event) {
    this.selectedVendor = event.date
  }
}