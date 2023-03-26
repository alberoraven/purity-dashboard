import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-card-widget',
  templateUrl: './service-card-widget.component.html',
  styleUrls: ['./service-card-widget.component.scss']
})
export class ServiceCardWidgetComponent implements OnInit {
  @Input() public service: any;
  constructor() {
  }

  ngOnInit(): void {
  }

}
