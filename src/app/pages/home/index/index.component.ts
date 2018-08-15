import { Component, OnInit } from '@angular/core';
import { PatientRestService } from '../../../@fhir/patient-rest.service';
import { ObservationRestService } from '../../../@fhir/observation-rest.service';
import notify from '../../../../../node_modules/devextreme/ui/notify';
import DataSource from '../../../../../node_modules/devextreme/data/data_source';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  identifierValue = 'A1----2--3';
  patient;
  dataSet = [];
  loadingVisible = false;
  dataSource: DataSource;

  data;
  popupVisible = false;


  constructor(private patientRestService: PatientRestService,
              private observationRestService: ObservationRestService) {
  }

  ngOnInit() {
    const patient = localStorage.getItem('myPatient');
    if (patient !== null && patient !== undefined && patient !== 'undefined') {
      this.patient = JSON.parse(patient);
      this.identifierValue = this.patient.identifier[0].value;
      this.loadingVisible = true;
      this.fetchData();
    }
  }

  onRawData(data) {
    this.data = data;
    this.popupVisible = true;
    console.info(this.data);
  }

  findPatient(identifier) {
    console.info(identifier);
    this.patient = null;
    this.patientRestService.fetchAll({
      'identifier': identifier,
    }).subscribe(next => {
      console.info(next);
      this.patient = next[0];
      this.identifierValue = this.patient.identifier[0].value;
      localStorage.setItem('myPatient', JSON.stringify(this.patient));
    }, error => {
      notify('查詢失敗');
    }, () => {
      this.fetchData();
    });
  }

  logout() {
    localStorage.removeItem('myPatient');
    this.patient = null;
    this.identifierValue = null;
    this.dataSource = null;
    this.dataSet = [];
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
}
