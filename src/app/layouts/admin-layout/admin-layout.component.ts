import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    if ((sessionStorage.getItem("isLogin") !== 'true')) {
      this.router.navigateByUrl('/login');
    }
  }

}
