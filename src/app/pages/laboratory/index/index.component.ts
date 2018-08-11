import { Component, OnInit } from '@angular/core';
import { ObservationRestService } from '../../../@fhir/observation-rest.service';
import { PatientRestService } from '../../../@fhir/patient-rest.service';
import notify from '../../../../../node_modules/devextreme/ui/notify';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  classifications = [{
    class: '身高',
    unit: '公分',
    code: '3137-7',
  }, {
    class: '體重',
    unit: '公斤',
    code: '3141-9',
  }, {
    class: 'BMI',
    unit: 'kg/m²',
    code: '39156-5',
  }, {
    class: '體溫',
    unit: '(°C)',
    code: '8310-5',
  }, {
    class: '脈搏/心跳',
    unit: '次/分',
    code: '8867-4',
  }, {
    class: '血氧',
    unit: '%',
    code: '1556-0',
  }, {
    class: '飯前血糖',
    unit: 'mg/dl',
    code: '62851-1',
  }, {
    class: '收縮壓',
    unit: 'mmHg',
    code: '8480-6',
  }, {
    class: '舒張壓',
    unit: 'mmHg',
    code: '8462-4',
  }, {
    class: '低密度蛋白膽固醇',
    unit: 'mg/dl',
    code: '2089-1',
  }, {
    class: '總膽固醇',
    unit: 'mg/dl',
    code: '2093-3',
  }, {
    class: '腎絲球過濾率',
    unit: '(%)',
    code: '33914-3',
  }, {
    class: '糖化血紅素過濾率',
    unit: '(%)',
    code: '4548-4',
  }, {
    class: '肌酸酐',
    unit: 'mg/dl',
    code: '2160-0',
  }];

  selectedClassification = this.classifications[0];
  patient;

  constructor(private observationRestService: ObservationRestService,
              private patientRestService: PatientRestService) {
  }

  ngOnInit() {
  }

  onSelectClassification(selected) {
    this.selectedClassification = this.classifications.find(v => v.class === selected);
  }

  onSave(resource) {
    if (!this.patient) {
      notify('請先以身份證字號搜尋病人');
      return;
    }

    resource['subject'] = {
      id: 'Patient/' + this.patient.id,
    };

    this.observationRestService.create({
      resource: resource,
    }).subscribe(next => {
      notify('新增成功');
    });
  }

  findPatient(identifier) {
    console.info(identifier);
    this.patient = null;
    this.patientRestService.fetchAll({
      'identifier': identifier,
    }).subscribe(next => {
      console.info(next);
      this.patient = next[0];
    }, error => {
      notify('查詢失敗');
    }, () => {
    });
  }
}
