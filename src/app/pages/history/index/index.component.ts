import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConditionRestService } from '../../../@fhir/condition-rest.service';
import { ProcedureRestService } from '../../../@fhir/procedure-rest.service';
import { PatientRestService } from '../../../@fhir/patient-rest.service';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  dataSet = [];
  loadingVisible = false;
  currentDate: Date = new Date();

  resourceType = [
    {
      text: 'Condition',
      id: 'Condition',
      color: '#1e90ff',
    }, {
      text: 'Procedure',
      id: 'Procedure',
      color: '#ff9747',
    },
  ];
  patient;

  constructor(private conditionRestService: ConditionRestService,
              private procedureRestService: ProcedureRestService,
              private patientRestService: PatientRestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const patientId = this.route.snapshot.params['patientId'];
    if (patientId == null) {
      const patient = localStorage.getItem('myPatient');
      if (patient !== null) {
        this.patient = JSON.parse(patient);
        this.fetchData(this.patient);
      }
    } else {
      this.patientRestService.read(patientId).subscribe(next => {
        this.patient = next.data;
        this.fetchData(this.patient);
      });
    }
  }

  fetchData(patient) {
    this.loadingVisible = true;
    this.conditionRestService.fetchAll({}, patient.id).subscribe(next => {
      next = next.map(entity => {
        if (entity['onsetPeriod']) {
          entity['start'] = entity['onsetPeriod']['start'];
          entity['end'] = entity['onsetPeriod']['end'];
        }
        return entity;
      });
      this.dataSet = this.dataSet.concat(next);
    }, err => {
      console.error(err);
    }, () => {
      this.loadingVisible = false;
    });

    this.loadingVisible = true;
    this.procedureRestService.fetchAll({}, patient.id).subscribe(next => {
      next = next.map(entity => {
        if (entity['performedPeriod']) {
          entity['start'] = entity['performedPeriod']['start'];
          entity['end'] = entity['performedPeriod']['end'];
        }
        return entity;
      });
      this.dataSet = this.dataSet.concat(next);
    }, err => {
      console.error(err);
    }, () => {
      this.loadingVisible = false;
    });
  }

}
