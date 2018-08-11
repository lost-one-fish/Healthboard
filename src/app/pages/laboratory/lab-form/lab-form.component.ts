import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss'],
})
export class LabFormComponent implements OnInit {

  @Input()
  title;

  constructor() { }

  ngOnInit() {
  }

}
