import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import * as Query from '../../@shared/queries';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetails implements OnInit {

  dataSource;
  displayedColumns = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.displayedColumns = ["booking_id", "name", "phone", "service_detail", "booking_status", "service_date", "vendor_name", "booking_date"]
    this.createTable();
  }
  createTable() {
    this.apollo.watchQuery<any>({
      query: Query.GetOverallList
    }).valueChanges.subscribe(
      ({ data }) => {
        this.dataSource = new MatTableDataSource([...data.active_bookings])
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
