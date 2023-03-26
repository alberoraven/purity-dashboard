import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/@shared/shared.service';
import { nhost } from '../../@shared/global';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  @Input() name;
  public phone: any;
  public otp: any;
  public hasRequestedOTP = false;


	constructor(
    public activeModal: NgbActiveModal,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
  }

  requestOTP() {
    nhost.auth.signIn({ phoneNumber: `+91${this.phone}` }).then(res => {
      this.hasRequestedOTP = true;
    })
  }

  signIn() {
    nhost.auth.signIn({ phoneNumber: `+91${this.phone}`, otp: `${this.otp}` }).then(res => {
      console.log(res);
      sessionStorage.setItem('user', JSON.stringify(res.session.user));
      this.sharedService.userData.next(res.session.user);
      this.activeModal.close('Successful');
    })
  }

  
}
