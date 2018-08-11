import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss'],
})
export class LabFormComponent implements OnInit {

  @Input()
  title;

  format = '#0.## 公分';
  now;

  constructor() { }

  ngOnInit() {
    this.now = new Date();
  }

}
