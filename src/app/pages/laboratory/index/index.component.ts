import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  classifications = [{
    class: '身高',
    unit: '公分',
  }, {
    class: '體重',
    unit: '公斤',
  }, {
    class: 'BMI',
    unit: 'kg/m²',
  }, {
    class: '體溫',
    unit: '(°C)',
  }, {
    class: '脈搏/心跳',
    unit: '次/分',
  }, {
    class: '血氧',
    unit: '%',
  }, {
    class: '飯前血糖',
    unit: 'mg/dl',
  }, {
    class: '收縮壓',
    unit: 'mmHg',
  }, {
    class: '舒張壓',
    unit: 'mmHg',
  }, {
    class: '低密度蛋白膽固醇',
    unit: 'mg/dl',
  }, {
    class: '總膽固醇',
    unit: 'mg/dl',
  }, {
    class: '腎絲球過濾率',
    unit: '(%)',
  }, {
    class: '糖化血紅素過濾率',
    unit: '(%)',
  }, {
    class: '肌酸酐',
    unit: 'mg/dl',
  }];

  selectedClassification = this.classifications[0];

  constructor() {
  }

  ngOnInit() {
  }

  onSelectClassification(selected) {
    this.selectedClassification = this.classifications.find(v => v.class === selected);
  }
}
