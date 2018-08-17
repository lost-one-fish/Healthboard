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
  selector: 'ngx-observation-list',
  templateUrl: './observation-list.component.html',
  styleUrls: ['./observation-list.component.scss'],
})
export class ObservationListComponent implements OnInit, OnChanges {

  classifications = {
    '3137-7': '身高',
    '3141-9': '體重',
    '39156-5': 'BMI',
    '8310-5': '體溫',
    '8867-4': '脈搏/心跳',
    '1556-0': '血氧',
    '62851-1': '飯前血糖',
    '8480-6': '收縮壓',
    '8462-4': '舒張壓',
    '2089-1': '低密度蛋白膽固醇',
    '2093-3': '總膽固醇',
    '33914-3': '腎絲球過濾率',
    '4548-4': '糖化血紅素過濾率',
    '2160-0': '肌酸酐',
  };

  @Input()
  dataSet = [];

  @Output()
  rawdata = new EventEmitter();

  dataSource: DataSource;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSet']) {
      const data = changes['dataSet'].currentValue.map(resource => {
        resource.code.text = this.classifications[resource.code.coding[0].code];
        return resource;
      });
      this.dataSource = new DataSource(data);
    }
  }

  onRawData(data) {
    this.rawdata.emit(data);
  }
}
