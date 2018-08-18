import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'ngx-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss'],
})
export class CaseListComponent implements OnInit, OnChanges {

  @Input()
  dataSet = [];

  @Output()
  refresh = new EventEmitter();

  @Output()
  create = new EventEmitter();

  @Output()
  update = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  dataSource: DataSource;

  data;
  popupVisible = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSet']) {
      this.dataSource = new DataSource(changes['dataSet'].currentValue);
    }
  }

  setIdentifier(rawData, val) {
    rawData.identifier = [{
      value: val,
    }];
  }

  setName(rawData, val) {
    rawData.name = [{
      text: val,
    }];
  }

  setGender(rawData, val) {
    rawData.gender = val;
  }

  setBirthDate(rawData, val) {
    rawData.birthDate = val;
  }

  setAddress(rawData, val) {
    rawData.address = [{
      text: val,
    }];
  }

  setTelecom(rawData, val) {
    rawData.telecom = [{
      system: 'phone',
      value: val,
    }];
  }

  setContact(rawData, val) {
  }

  onRowInserting(e) {
    e.data.resourceType = 'Patient';
    this.create.emit(e.data);
  }

  onRowUpdating(e) {
    const resource = Object.assign(e.oldData, e.newData);
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
    this.data = data;
    this.popupVisible = true;
    console.info(this.data);
  }

}
