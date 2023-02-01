import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'


import * as Query from '../../@shared/queries';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  dataSource;
  displayedColumns = [];

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.displayedColumns = ["active_bookings.user_profile.name", "active_bookings.user_profile.phone", "active_bookings.service_detail.name", "active_bookings.booking_status.name", "active_bookings.service_date", "active_bookings.booking_date"]
    this.createTable();
  }
  createTable() {
    this.apollo.watchQuery<any>({
      query: Query.GetOverallList
    }).valueChanges.subscribe(
      ({ data }) => {
        this.dataSource = new MatTableDataSource([...data.active_bookings])
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
