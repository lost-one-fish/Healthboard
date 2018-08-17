import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConditionRestService } from '../../../@fhir/condition-rest.service';
import { ProcedureRestService } from '../../../@fhir/procedure-rest.service';

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

  constructor(private conditionRestService: ConditionRestService,
              private procedureRestService: ProcedureRestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const patientId = this.route.snapshot.params['patientId'];

    this.loadingVisible = true;
    this.conditionRestService.fetchAll().subscribe(next => {
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
    this.procedureRestService.fetchAll().subscribe(next => {
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
