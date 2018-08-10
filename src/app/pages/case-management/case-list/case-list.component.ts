import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'ngx-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css'],
})
export class CaseListComponent implements OnInit, OnChanges {

  @Input()
  dataSet = [];

  dataSource: DataSource;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSet']) {
      this.dataSource = new DataSource(changes['dataSet'].currentValue);
    }
  }

}
