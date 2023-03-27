import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as Query from '../../@shared/queries';
import { nhost } from '../../@shared/global';
import { FormBuilder, Validators, FormGroup, ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
  @Input() serviceDetail: any;
  public selected: Date | null;
  public closeResult: string;
  public userProfile: any;
  public address_name: string;
  public selected_address: any;
  public addressForm : FormGroup;
  public summaryForm : FormGroup;
  @Input() public modalData: any;
  
  constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
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
      address_name: ['', [Validators.required, Validators.minLength(3)]],
      address: [ {value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      locality: [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      city: [{value: 'Chennai', disabled: true}, [Validators.required, Validators.minLength(3)]],
      pincode: [{value: '', disabled: true}, [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]]
    });
  }

  setAddressFormValue(formData) {
    this.addressForm.controls['address_name'].setValue(formData.address_name);
    this.addressForm.controls['address'].setValue(formData.address);
    this.addressForm.controls['locality'].setValue(formData.locality);
    this.addressForm.controls['city'].setValue(formData.city);
    this.addressForm.controls['pincode'].setValue(formData.pincode);
  }
  onBookingFormSubmit() {
    console.log(this.addressForm.value);
    console.log(this.serviceDetail);
  }
}
