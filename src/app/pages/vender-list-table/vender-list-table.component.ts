import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Query from '../../@shared/queries';
import { NgForm } from '@angular/forms';
import { nhost } from '../../@shared/global';


@Component({
  selector: 'app-vender-list-table',
  templateUrl: './vender-list-table.component.html',
  styleUrls: ['./vender-list-table.component.scss']
})
export class VendorListTableComponent implements OnInit {

  public vendorList: any;
  vendor = { email: '' };

  constructor(
    public elRef: ElementRef
  ) { }

  ngOnInit() {
    this.getVendorList()
  }

  async submit(form: NgForm) {
    if (form.valid) {
      const { data, error } = await nhost.graphql.request(Query.addVendor(form.value.Email))
      if (data) {
        this.elRef.nativeElement.querySelector(".text-success").innerHTML = "Successfully added !!";
        this.elRef.nativeElement.querySelector(".error").style.display = "none";
        this.elRef.nativeElement.querySelector(".text-success").style.display = "block";
      } else if (error[0].extensions.code === 'constraint-violation') {
        this.elRef.nativeElement.querySelector(".error").innerHTML = "Email already Exists";
        this.elRef.nativeElement.querySelector(".text-success").style.display = "none";
        this.elRef.nativeElement.querySelector(".error").style.display = "block";
      }
      else {
        this.elRef.nativeElement.querySelector(".error").innerHTML = "We are facing an error in updating. Kindly contact admistrator";
        this.elRef.nativeElement.querySelector(".text-success").style.display = "none";
        this.elRef.nativeElement.querySelector(".error").style.display = "block";
      }

    }
  }
  async getVendorList() {
    const { data, error } = await nhost.graphql.request(Query.vendorList)
    if (data) {
      this.vendorList = [...(data.vendor_profiles)];
    }
  }
}
