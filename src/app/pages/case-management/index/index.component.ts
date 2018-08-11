import { Component, OnInit } from '@angular/core';
import { PatientRestService } from '../../../@fhir/patient-rest.service';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  dataSet = [];
  loadingVisible = false;

  constructor(private patientService: PatientRestService) {
  }

  ngOnInit() {
    this.loadingVisible = true;
    this.patientService.fetchAll().subscribe(
      next => {
        this.dataSet = this.dataSet.concat(next);
      },
      err => {
        console.error(err);
      },
      () => {
        this.loadingVisible = false;
      });
  }
}
