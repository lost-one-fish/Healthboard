import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import DataSource from '../../../../../node_modules/devextreme/data/data_source';

@Component({
  selector: 'ngx-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.scss'],
})
export class LabListComponent implements OnInit, OnChanges {

  @Input()
  dataSet = [];

  dataSource: DataSource;

  data;
  popupVisible = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSet']) {
      this.dataSource = new DataSource(changes['dataSet'].currentValue);
    }
  }
}
