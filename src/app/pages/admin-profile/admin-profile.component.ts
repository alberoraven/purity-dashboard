import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nhost } from '../../@shared/global';
import { getVendorDetails, GetUserProfile } from "../../@shared/queries";



@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  public user;

  constructor(
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params.id) {
        const { data, error } = await nhost.graphql.request(getVendorDetails(params.id))
        if (data) {
          this.user = {
            "displayName": data.user.displayName,
            "avatarUrl": data.user.avatarUrl,
            "address": data.vendor_profiles[0].address,
            "city": data.vendor_profiles[0].city,
            "locality": data.vendor_profiles[0].locality,
            "email": data.vendor_profiles[0].email,
            "phoneNumber": data.vendor_profiles[0].phone,
            "pincode": data.vendor_profiles[0].pincode,
            "roles": "Vendor"
          }
        }
      } else if (params.User) {
        const { data, error } = await nhost.graphql.request(GetUserProfile(params.User))
        if (data) {
          this.user = {
            "displayName": data.user_profiles[0].user.displayName,
            "avatarUrl": data.user_profiles[0].user.avatarUrl,
            "address": data.user_profiles[0]?.user_addresses[0]?.address,
            "city": data.user_profiles[0]?.user_addresses[0]?.city,
            "locality": data.user_profiles[0]?.user_addresses[0]?.locality,
            "email": data.user_profiles[0].user.email,
            "phoneNumber": data.user_profiles[0].phone,
            "pincode": data.user_profiles[0]?.user_addresses[0]?.pincode,
            "roles": "User"
          }

        }

      } else {
        this.user = nhost.auth.getUser();
      }
    }
    )
  }
  formatJSON(data) {
    let formattedData;
    formattedData.displayName = data.user.displayName
    formattedData.avatarUrl = data.user.avatarUrl
    formattedData.address = data.vendor_profiles[0].address
    formattedData.city = data.vendor_profiles[0].city
    formattedData.locality = data.vendor_profiles[0].locality
    formattedData.email = data.vendor_profiles[0].email
    formattedData.phone = data.vendor_profiles[0].phone
    return formattedData;
  }
}
