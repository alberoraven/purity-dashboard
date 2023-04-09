import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewAddressModalComponent } from '../add-new-address-modal/add-new-address-modal.component';
import { SharedService } from 'src/app/@shared/shared.service';
import locations from 'src/assets/data/locality.json';
import * as Query from '../../@shared/queries';
import { nhost } from '../../@shared/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userProfile: any;
  public profileForm : FormGroup;
  public addNewAddressForm : FormGroup;
  public localities: any;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.createProfileForm(params?.id);
      this.localities = locations.locations;
      this.userProfile = await this.getUserProfile(params?.id);
      if (this.userProfile) {
        this.setProfileFormValue(this.userProfile);
      }
    });
    // this.sharedService.userData.subscribe(async res => {
      
    // });
  }

  async getUserProfile(id) {
    const { data, error } = await nhost.graphql.request(Query.GetUserProfile(id))
    return [...(data.user_profiles)][0];
  }

  createProfileForm(userId) {
    this.profileForm = this.formBuilder.group({
      user_id: [{value: userId, disabled: true}, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      phone: [{value: '', disabled: true}, [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      address_id: ['', [Validators.required]],
      address_name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      locality: ['', [Validators.required, Validators.minLength(3)]],
      city: [{value: 'Chennai', disabled: true}, [Validators.required, Validators.minLength(3)]],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      is_preferred_address: [false, [Validators.required]]
    });
  }

  setProfileFormValue(formData) {
    const addressObj = formData.user_addresses.filter(res => res.is_preferred_address === true)[0];
    this.profileForm.controls['name'].setValue(formData.name);
    this.profileForm.controls['email'].setValue(formData.email);
    this.profileForm.controls['phone'].setValue(formData.phone);
    this.profileForm.controls['address_id'].setValue(addressObj.id);
    this.profileForm.controls['address_name'].setValue(addressObj.address_name);
    this.profileForm.controls['address'].setValue(addressObj.address);
    this.profileForm.controls['locality'].setValue(addressObj.locality);
    this.profileForm.controls['city'].setValue(addressObj.city);
    this.profileForm.controls['pincode'].setValue(addressObj.pincode);
    this.profileForm.controls['is_preferred_address'].setValue(addressObj.is_preferred_address);
  }
  selectAddress(addressName) {
    const addressObj = this.userProfile.user_addresses.filter(res => res.address_name === addressName)[0];
    this.profileForm.controls['address_id'].setValue(addressObj.id);
    this.profileForm.controls['address'].setValue(addressObj.address);
    this.profileForm.controls['locality'].setValue(addressObj.locality);
    this.profileForm.controls['city'].setValue(addressObj.city);
    this.profileForm.controls['pincode'].setValue(addressObj.pincode);
    this.profileForm.controls['is_preferred_address'].setValue(addressObj.is_preferred_address);
  }
  
  openAddNewAddressModal() {
    const modalRef = this.modalService.open(AddNewAddressModalComponent, { windowClass: 'modal-mini', size: 'md', centered: true });
    modalRef.result.then(async (result) => {
      const user_id = nhost.auth.getUser().id;
      result.user_id = user_id;
      console.log(result);
      await nhost.graphql.request(Query.AddUserAddress(result));
      this.userProfile = await this.getUserProfile(user_id);
      if (this.userProfile) {
        this.setProfileFormValue(this.userProfile);
      };
    });
    // modalRef.componentInstance.serviceDetail = this.serviceDetail;
  }

  async submitUpdateProfile() {
    const data = this.profileForm.getRawValue();
    if (this.userProfile && this.userProfile.is_profile_completed) {
      const addressObj = {
        user_id: data.user_id,
        address_id: data.address_id,
        address_name : data.address_name,
        address: data.address,
        locality: data.locality,
        city: data.city,
        pincode: data.pincode,
        is_preferred_address: data.is_preferred_address
      };
      const userObj = {
        user_id: data.user_id,
        name: data.name,
        phone: data.phone,
        email: data.email
      }

      console.log(addressObj);
      await nhost.graphql.request(Query.UpdateUserProfile(userObj));
      await nhost.graphql.request(Query.UpdateUserAddress(addressObj));

    } else {
      await nhost.graphql.request(Query.CreateUserProfile(data));
    }
  }
}