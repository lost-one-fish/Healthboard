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

  texts = {
    // reference:
    // https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/editing/texts/
    editRow: '編輯',
    deleteRow: '刪除',
  };

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

  onInitNewRow(e) {
    if (!e.data.code || !e.data.code.coding) {
      e.data.code = {
        coding: [{
          display: '',
          code: '',
        }],
      };
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

  setStatusValue(newData, value, currentRowData) {
    newData.status = value;
  }

  onRowInserting(e) {
    e.data.resourceType = 'Procedure';
    e.data['performedDateTime'] = new Date();
    this.create.emit(e.data);
  }

  onRowUpdating(e) {
    const resource = Object.assign(e.oldData, e.newData);
    resource['performedDateTime'] = new Date();
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
