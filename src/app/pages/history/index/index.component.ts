import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  currentDate: Date = new Date();

  resourceType = [
    {
      text: 'Condition',
      id: 'Condition',
      color: '#1e90ff',
    }, {
      text: 'Procedure',
      id: 'Procedure',
      color: '#ff9747',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
