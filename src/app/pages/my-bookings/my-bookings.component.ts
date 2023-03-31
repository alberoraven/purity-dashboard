import { Component, OnInit } from '@angular/core';
import { nhost } from '../../@shared/global';
import * as Query from '../../@shared/queries';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  public bookingsList: any;
  constructor() { }

  async ngOnInit(): Promise<void> {
    this.bookingsList = await this.getBookingsList(nhost.auth.getUser().id);
    console.log(this.bookingsList);
  }

  async getBookingsList(user_id) {
    const { data, error } = await nhost.graphql.request(Query.GetUserBookingsList(user_id))
    return [...(data.active_bookings)];
  }

}
