import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  classifications = ['身高', '體重', 'BMI', '體溫', '脈搏/心跳',
    '血氧', '飯前血糖', '收縮壓', '舒張壓', '低密度蛋白膽固醇',
    '總膽固醇', '腎絲球過濾率', '糖化血紅素過濾率', '肌酸酐'];

  selectedClassification = this.classifications[0];

  constructor() {
  }

  ngOnInit() {
  }

  onSelectClassification(selected) {
    this.selectedClassification = selected;
  }
}
