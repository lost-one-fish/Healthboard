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
  selector: 'ngx-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.scss'],
})
export class ProcedureListComponent implements OnInit, OnChanges {

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

  statusItems = [
    {
      key: 'preparation',
      value: '預備',
    },
    {
      key: 'in-progress',
      value: '進行中',
    },
    {
      key: 'suspended',
      value: '暫停',
    },
    {
      key: 'aborted',
      value: '中止',
    },
    {
      key: 'completed',
      value: '完成',
    },
    {
      key: 'entered-in-error',
      value: '輸入錯誤',
    },
    {
      key: 'unknown',
      value: '未知',
    },
  ];

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

  setStatusValue(rawData, val) {
    rawData.status = val;
  }

  onRowInserting(e) {
    e.data.resourceType = 'Procedure';
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
