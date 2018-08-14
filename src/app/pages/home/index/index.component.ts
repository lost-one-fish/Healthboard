import { Component, OnInit } from '@angular/core';
import { PatientRestService } from '../../../@fhir/patient-rest.service';
import notify from '../../../../../node_modules/devextreme/ui/notify';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  patient;

  constructor(private patientRestService: PatientRestService) { }

  ngOnInit() {
    const patient = localStorage.getItem('myPatient');
    if (patient !== null) {
      this.patient = JSON.parse(patient);
    }
  }

  findPatient(identifier) {
    console.info(identifier);
    this.patient = null;
    this.patientRestService.fetchAll({
      'identifier': identifier,
    }).subscribe(next => {
      console.info(next);
      this.patient = next[0];
      localStorage.setItem('myPatient', JSON.stringify(this.patient));
    }, error => {
      notify('查詢失敗');
    }, () => {
    });
  }

  logout() {
    localStorage.removeItem('myPatient');
    this.patient = null;
  }
}
