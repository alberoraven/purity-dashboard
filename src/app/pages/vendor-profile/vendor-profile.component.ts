import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nhost } from '../../@shared/global';
import { getVendorDetails, GetUserProfile } from "../../@shared/queries";

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {

  public data: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      console.log(params);
      if (params.id) {
        const { data, error } = await nhost.graphql.request(getVendorDetails(params.id))
        if (data) {
          console.log(data);
          this.data = data.vendor_profiles[0];
        }
      } else {
        this.data = nhost.auth.getUser();
      }
    }
    )
  }
}
