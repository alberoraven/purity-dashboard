import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { nhost } from '../../@shared/global';
import * as Query from '../../@shared/queries';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  public servicesList: any[];
  public focus: any;
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getServices().then(res => {
      this.options = this.servicesList;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value: any) => value.length >= 2 ? this._filter(value || '') : []),
      );
    });
  }

  async getServices() {
    const { data, error } = await nhost.graphql.request(Query.serviceDetailsList)
    if (data) {
      console.log(data);
      this.servicesList = [...(data.service_details)];
    }
  }

  getServiceDetails(service) {
    this.router.navigate([`user/service-details/${service.sid}`], {state: service});
  }

  private _filter(value: string): string[] {
    // const filterValue = value.toLowerCase();
    return this.options.filter((option: any) => option.name.toLowerCase().includes(value.toLowerCase()));
  }
}

// return this.options.map((x: any) => x.name).filter(option =>
//   option.toLowerCase().includes(value.toLowerCase()));