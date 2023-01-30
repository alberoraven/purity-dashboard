import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { nhost } from '../../@shared/global';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public elRef: ElementRef
  ) { }

  ngOnInit() {
    if (localStorage.getItem("isLogin")) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  async onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      await nhost.auth.signIn({
        email: form.value.username,
        password: form.value.password
      }).then(res => {
        if (res.error) {
          this.elRef.nativeElement.querySelector(".error").innerHTML = res.error.message + "!";
        } else {
          res.session.user.roles.forEach((roles: any) => {
            if (roles === "admin") {
              localStorage.setItem("isLogin", "true");
              this.router.navigateByUrl('/dashboard');
            } else {
              this.elRef.nativeElement.querySelector(".error").innerHTML = "UnAuthorised User";
              return nhost.auth.signOut().then(() => {
                localStorage.setItem("isLogin", "false");
              })
            }
          })
        }
      })
    }
  }
}
