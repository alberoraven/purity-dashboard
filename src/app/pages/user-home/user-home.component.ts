import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { nhost } from '../../@shared/global';
import * as Query from '../../@shared/queries';
import { SharedService } from 'src/app/@shared/shared.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  public servicesList: any[];
  public focus: any;
  public myControl = new FormControl('');
  public options: string[] = [];
  public filteredOptions: Observable<string[]>;

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.userData.subscribe(async (res) => {
      if (res) {
        const userProfileData = await this.isProfileCompleted(res.id);
        if (userProfileData.length == 0) {
          this.router.navigateByUrl(`user/profile?id=${nhost.auth.getUser().id}`);
          return;
        } else {
          this.getServices();
        }
      } else {
        this.getServices();
      }
    })
  }

  async getServices() {
    const { data, error } = await nhost.graphql.request(Query.serviceDetailsList)
    if (data) {
      this.servicesList = [...(data.service_details)];
      this.options = this.servicesList;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value: any) => value.length >= 2 ? this._filter(value || '') : []),
      );
    }
  }

  getServiceDetails(service) {
    this.router.navigate([`user/service-details/${service.sid}`], {state: service});
  }

  private _filter(value: string): string[] {
    // const filterValue = value.toLowerCase();
    return this.options.filter((option: any) => option.name.toLowerCase().includes(value.toLowerCase()));
  }

  async isProfileCompleted(id) {
    const { data, error } = await nhost.graphql.request(Query.IsUserProfileCompleted(id));
    return [...(data.user_profiles)];
  }
}