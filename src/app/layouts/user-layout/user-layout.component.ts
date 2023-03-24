import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    if ((sessionStorage.getItem("isLogin") !== 'true') && window.location.pathname.indexOf('privacy-policy') < 1) {
      this.router.navigateByUrl('/login');
    }
  }

}
