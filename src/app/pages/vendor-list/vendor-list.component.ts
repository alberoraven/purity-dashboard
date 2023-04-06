import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as Query from '../../@shared/queries';
import { nhost } from '../../@shared/global';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  public unAssignedServices: any;
  public vendorList: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public displayedColumns: string[] = ['booking_id', 'booking_status', 'customer_name', 'service_name', 'service_date', 'booking_date', 'locality', 'vendor_name'];
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.getVendorList();
    this.unAssignedServices = this.deStructureServicesListData(await this.getUnassignedServiceList());
    this.dataSource = new MatTableDataSource(this.unAssignedServices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deStructureServicesListData(data: any) {
    const temp = [];
    data.forEach(item => {
      temp.push({
        booking_id: item.booking_id,
        booking_status_name: item.booking_status.name,
        booking_status_id: item.booking_status.status_id,
        booking_date: item.booking_date,
        customer_id: item.user_profile?.user_id,
        customer_name: item.user_profile?.name,
        service_name: item.service_detail?.name,
        service_id: item.service_detail?.sid,
        service_date: item.service_date,
        locality: item.user_address?.locality,
        vendor_name: item.vendor_profile?.name,
        vendor_id: item.vendor_profile?.user_id
      });
    });
    return temp; 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getUnassignedServiceList() {

    const { data, error } = await nhost.graphql.request(Query.UnAssignedServices);
    if (data) {
      return [...(data.active_bookings)]
    }
  }
  async getVendorList() {
    const { data, error } = await nhost.graphql.request(Query.vendorList)
    if (data) {
      [...(data.vendor_profiles)].forEach(res => {
        if (res.is_vendor_available) {
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

  getBookingStatusColor (status_id: number) {
    let statusColor;
    switch (status_id) {
      case 1:
        statusColor = 'blue'
        break;
      case 2:
        statusColor = 'yellow'
        break;
      case 3:
        statusColor = 'green'
        break;   
      case 6:
        statusColor = 'red'
        break;
      default:
        statusColor = 'red'
        break;
    }
    return statusColor;
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
  public selectedVendor: string;
  public myControl = new FormControl('');
  public filteredOptions: Observable<string[]>;
  public emailId;
  public status;
  public bookingId;

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