import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidatorFn } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import * as Query from '../../@shared/queries';
import { nhost } from '../../@shared/global';
@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
  public selected: Date | null;
  public closeResult: string;
  public userProfile: any;
  public address_name: string;
  public selected_address: any;
  public addressForm : FormGroup;
  public summaryForm : FormGroup;
  public currentDate = Date.now();
  @Input() serviceDetail: any;
  @Input() public modalData: any;
  
  constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.createAddressForm();
    console.log(this.serviceDetail);
  }

  openDateModal(content, data) {
    console.log(data);
    this.activeModal.close('done');
    const modalRef = this.modalService.open(content, { windowClass: 'modal-mini', size: 'md', centered: true });
  }

  openAddressModal(content, data) {
    console.log(data);
    this.activeModal.close('done');
    const modalRef = this.modalService.open(content, { windowClass: 'modal-mini', size: 'md', centered: true });
    // console.log(data, this.datePipe.transform(this.selected, 'yyyy/MM/dd'));
  }

  openSummaryModal(content, data) {
    this.activeModal.close('done');
    const modalRef = this.modalService.open(content, { windowClass: 'modal-mini', size: 'md', centered: true });
  }

  close(data) {
    this.activeModal.close(data);
  }

  async getUserProfile() {
    const { data, error } = await nhost.graphql.request(Query.GetUserProfile(nhost.auth.getUser().id))
    if (data) {
      console.log([...(data.user_profiles)][0]);
      this.userProfile = [...(data.user_profiles)][0];
    }
  }
  updateAddress(event) {
    this.selected_address = this.userProfile.user_addresses.filter(res => res.address_name === event)[0];
    console.log(this.selected_address);
    this.setAddressFormValue(this.selected_address);
  }

  createAddressForm() {
    this.addressForm = this.formBuilder.group({
      address_id: [{value: '', disabled: true}, [Validators.required]],
      address_name: ['', [Validators.required, Validators.minLength(3)]],
      address: [ {value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      locality: [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      city: [{value: 'Chennai', disabled: true}, [Validators.required, Validators.minLength(3)]],
      pincode: [{value: '', disabled: true}, [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]]
    });
  }

  setAddressFormValue(formData) {
    console.log(formData);
    this.addressForm.controls['address_id'].setValue(formData.id);
    this.addressForm.controls['address_name'].setValue(formData.address_name);
    this.addressForm.controls['address'].setValue(formData.address);
    this.addressForm.controls['locality'].setValue(formData.locality);
    this.addressForm.controls['city'].setValue(formData.city);
    this.addressForm.controls['pincode'].setValue(formData.pincode);
  }
  async onBookingFormSubmit() {
    console.log(this.addressForm.getRawValue());
    const bookingData = {
      user_id : nhost.auth.getUser().id,
      service_id: this.serviceDetail.sid,
      service_date: this.datePipe.transform(this.selected, 'yyyy-MM-dd'),
      address_id: this.addressForm.getRawValue().address_id,
      address: this.addressForm.getRawValue().address,
      locality: this.addressForm.getRawValue().locality,
      city: this.addressForm.getRawValue().city,
      pincode: this.addressForm.getRawValue().pincode
    }
    console.log('BookingData :', bookingData);
    const { data, error } = await nhost.graphql.request(Query.ServiceBooking(bookingData));
    this.modalService.dismissAll();
    this.showNotification(data ? 'success' : 'error');
  }

  showNotification(type: string) {
    if (type == 'success') {
      swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your service has been booked successfully!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigateByUrl('user/home');
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
