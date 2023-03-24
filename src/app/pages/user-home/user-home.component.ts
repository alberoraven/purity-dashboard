import { Component, OnInit } from '@angular/core';
import { nhost } from '../../@shared/global';
import * as Query from '../../@shared/queries';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  public servicesList: any[];

  constructor() { }

  ngOnInit(): void {
    this.getServices();
  }

  async getServices() {
    const { data, error } = await nhost.graphql.request(Query.serviceDetailsList)
    if (data) {
      console.log(data);
      this.servicesList = [...(data.service_details)];
    }
  }

}
