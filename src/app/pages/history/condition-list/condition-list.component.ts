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

  @Input()
  loadingVisible = false;

  @Output()
  refresh = new EventEmitter();

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

  setCodingDisplay(newData, value, currentRowData) {
    newData.code = Object.assign({}, currentRowData.code);
    try {
      newData.code.coding[0].display = value;
    } catch (e) {
      console.error(e);
    }
  }

  setCodingCode(newData, value, currentRowData) {
    newData.code = Object.assign({}, currentRowData.code);
    try {
      newData.code.coding[0].code = value;
    } catch (e) {
      console.error(e);
    }
  }

  onRowInserting(e) {
    e.data.resourceType = 'Condition';
    e.data['assertedDate'] = new Date();
    this.create.emit(e.data);
  }

  onRowUpdating(e) {
    const resource = Object.assign(e.oldData, e.newData);
    resource['assertedDate'] = new Date();
    this.update.emit(resource);
  }

  onRowRemoving(e) {
    this.delete.emit(e.data);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this),
      },
    });
  }

  refreshDataGrid() {
    this.refresh.emit({});
  }

  onRawData(data) {
    this.rawdata.emit(data);
  }

}
