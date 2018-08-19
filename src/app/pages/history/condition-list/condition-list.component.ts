import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import DataSource from '../../../../../node_modules/devextreme/data/data_source';

@Component({
  selector: 'ngx-condition-list',
  templateUrl: './condition-list.component.html',
  styleUrls: ['./condition-list.component.scss'],
})
export class ConditionListComponent implements OnInit, OnChanges {

  @Input()
  dataSet = [];

  @Output()
  create = new EventEmitter();

  @Output()
  update = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  @Output()
  rawdata = new EventEmitter();

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

  setCodingCode(rawData, val) {
    rawData.code = {'coding': [{}]};
    rawData.code.coding[0] = {
      display: val,
    };
  }

  onRowInserting(e) {
    e.data.resourceType = 'Condition';
    this.create.emit(e.data);
  }

  onRowUpdating(e) {
    const resource = e.oldData;
    resource['code'] = e.newData.code;
    this.update.emit(resource);
  }

  onRowRemoving(e) {
    this.delete.emit(e.data);
  }

  onRawData(data) {
    this.rawdata.emit(data);
  }

}
