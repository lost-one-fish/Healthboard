import { Component, OnInit } from '@angular/core';
import { PatientRestService } from '../../../@fhir/patient-rest.service';
import 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'ngx-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css'],
})
export class CaseListComponent implements OnInit {
  dataSource: DataSource;
  private dataSet = [];
  constructor(private patientService: PatientRestService) {
  }

  ngOnInit() {
    this.patientService.fetchAll().subscribe(
      next => {
        this.dataSet = this.dataSet.concat(next);
        this.dataSource = new DataSource(this.dataSet);
      },
      err => {
        console.error(err);
      });
  }

}
