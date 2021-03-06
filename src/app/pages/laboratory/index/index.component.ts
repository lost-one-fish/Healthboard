import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservationRestService } from '../../../@fhir/observation-rest.service';
import { PatientRestService } from '../../../@fhir/patient-rest.service';
import notify from '../../../../../node_modules/devextreme/ui/notify';
import DataSource from '../../../../../node_modules/devextreme/data/data_source';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  dataSet = [];
  loadingVisible = false;
  dataSource: DataSource;

  data;
  popupVisible = false;

  classifications = [{
    class: '身高',
    unit: 'cm',
    code: '3137-7',
  }, {
    class: '體重',
    unit: 'kg',
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
    unit: 'BPM',
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
              private patientRestService: PatientRestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const patientId = this.route.snapshot.params['patientId'];
    if (patientId == null) {
      const patient = localStorage.getItem('myPatient');
      if (patient !== null) {
        this.patient = JSON.parse(patient);
        this.fetchData();
      }
    } else {
      this.patientRestService.read(patientId).subscribe(next => {
        this.patient = next.data;
        this.fetchData();
      });
    }
  }

  onSelectClassification(selected) {
    this.selectedClassification = this.classifications.find(v => v.class === selected);
  }

  onSave(resource) {
    if (!this.patient) {
      notify('請先以身份證字號搜尋病人');
      return;
    }

    this.observationRestService.create({
      resource: resource,
    }).subscribe(next => {
      this.dataSet = this.dataSet.filter(item => {
        return item.id !== resource.id;
      });
      this.dataSet.push(next.data);

      this.dataSource = new DataSource(this.dataSet);
    }, error => {
      notify('新增失敗');
    }, () => {
      notify('新增成功');
    });
  }

  fetchData() {
    if (this.patient == null) {
      return;
    }
    this.dataSet = [];

    this.observationRestService.fetchAll({}, this.patient.id).subscribe(next => {
      this.dataSet = this.dataSet.concat(next);
    }, error => {
      notify('調閱資料失敗');
    }, () => {
      this.loadingVisible = false;
      this.dataSource = new DataSource(this.dataSet);
    });
  }

  onRawData(data) {
    this.data = data;
    this.popupVisible = true;
  }
}
