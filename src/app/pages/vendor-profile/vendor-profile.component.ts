import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { nhost } from '../../@shared/global';
import * as Query from '../../@shared/queries';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {

  public vendorProfileData: any;
  public vendorProfileForm : FormGroup;
  public servicesList: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params.id) {
        this.createVendorProfileForm(params?.id);
        this.servicesList = await this.getServicesList();
        const { data, error } = await nhost.graphql.request(Query.getVendorDetails(params.id))
        if (data) {
          this.vendorProfileData = data.vendor_profiles[0];
          this.vendorProfileData.vendor_services.forEach(service => {
            this.servicesList.filter(res => {
                if (res.sid == service.service_detail.sid) {
                  res.checked = true;
                }
            })
          });
          this.setVendorProfileFormValue(this.vendorProfileData);
        }
      }
    })
  }

  createVendorProfileForm(userId) {
    this.vendorProfileForm = this.formBuilder.group({
      user_id: [{value: userId, disabled: true}, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      is_profile_completed: [ {value: false, disabled: true}, [Validators.required]],
      wallet_money: ['', [Validators.min(0)]],
      role: [{value: 'vendor', disabled: true}, [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      phone: [{value: '', disabled: true}, [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      locality: ['', [Validators.required, Validators.minLength(3)]],
      city: [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
    });
  }

  setVendorProfileFormValue(profileData) {
    this.vendorProfileForm.controls['name'].setValue(profileData.name);
    this.vendorProfileForm.controls['email'].setValue(profileData.email);
    this.vendorProfileForm.controls['phone'].setValue(profileData.phone);
    this.vendorProfileForm.controls['wallet_money'].setValue(profileData.wallet_money);
    this.vendorProfileForm.controls['is_profile_completed'].setValue(profileData.is_profile_completed);
    this.vendorProfileForm.controls['address'].setValue(profileData.address);
    this.vendorProfileForm.controls['locality'].setValue(profileData.locality);
    this.vendorProfileForm.controls['city'].setValue(profileData.city);
    this.vendorProfileForm.controls['pincode'].setValue(profileData.pincode);
  }

  updateServiceList(event, service) {
    this.vendorProfileData.vendor_services.push({
      service_detail : {
        sid : service.sid,
        name: service.name,
        checked: true
      }
    });
  }

  async getServicesList() {
    const { data, error } = await nhost.graphql.request(Query.serviceDetailsList)
    if (data) {
      return [...(data.service_details)];
    }
  }

  async UpdateVendorDetails() {
    const { data, error } = await nhost.graphql.request(Query.UpdateVendorDetails(this.vendorProfileForm.getRawValue()))
    if (data) {
      this.showNotification('success');
    }
  }

  showNotification(type: string) {
    if (type == 'success') {
      swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Vendor profile updated successfully!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.ngOnInit();
        }
      })
    } else {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong! Try again.',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }
}
