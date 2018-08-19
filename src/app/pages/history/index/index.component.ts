import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConditionRestService } from '../../../@fhir/condition-rest.service';
import { ProcedureRestService } from '../../../@fhir/procedure-rest.service';
import { PatientRestService } from '../../../@fhir/patient-rest.service';
import notify from '../../../../../node_modules/devextreme/ui/notify';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  conditions = []
  procedures = []
  dataSet = [];
  loadingVisible = false;
  currentDate: Date = new Date();

  data;
  popupVisible = false;

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

  onCreateCondition(resource) {
    if (!resource.subject || !resource.subject.reference) {
      resource.subject = {
        reference: 'Patient/' + this.patient.id,
      }
    }
    this.conditionRestService.create({
      resource: resource,
    }).subscribe(next => {
      notify('新增成功');

      let created: boolean = true;
      this.conditions = this.conditions.map(item => {
        if (item.id === resource.id) {
          created = false;
          return Object.assign({}, item, resource);
        } else {
          return item;
        }
      });
      if (created) {
        this.conditions.reverse();
        this.conditions.push(next.data);
        this.conditions.reverse();
      }
    });
  }

  onUpdateCondition(resource) {
    if (!resource.subject || !resource.subject.reference) {
      resource.subject = {
        reference: 'Patient/' + this.patient.id,
      }
    }
    this.conditionRestService.update({
      resource: resource,
    }).subscribe(next => {
      notify('更新成功');

      this.conditions = this.conditions.map(item => {
        if (item.id === resource.id) {
          return Object.assign({}, item, resource);
        } else {
          return item;
        }
      });
    });
  }

  onDeleteCondition(resource) {
    this.conditionRestService.delete({
      resource: resource,
    }).subscribe(next => {
      notify('刪除成功');
    });
  }

  onCreateProcedure(resource) {
    if (!resource.subject || !resource.subject.reference) {
      resource.subject = {
        reference: 'Patient/' + this.patient.id,
      }
    }
    this.procedureRestService.create({
      resource: resource,
    }).subscribe(next => {
      notify('新增成功');

      let created: boolean = true;
      this.procedures = this.procedures.map(item => {
        if (item.id === resource.id) {
          created = false;
          return Object.assign({}, item, resource);
        } else {
          return item;
        }
      });
      if (created) {
        this.procedures.reverse();
        this.procedures.push(next.data);
        this.procedures.reverse();
      }
    });
  }

  onUpdateProcedure(resource) {
    if (!resource.subject || !resource.subject.reference) {
      resource.subject = {
        reference: 'Patient/' + this.patient.id,
      }
    }
    this.procedureRestService.update({
      resource: resource,
    }).subscribe(next => {
      notify('更新成功');

      this.procedures = this.procedures.map(item => {
        if (item.id === resource.id) {
          return Object.assign({}, item, resource);
        } else {
          return item;
        }
      });
    });
  }

  onDeleteProcedure(resource) {
    this.procedureRestService.delete({
      resource: resource,
    }).subscribe(next => {
      notify('刪除成功');
    });
  }

  fetchData(patient) {
    if (patient == null) {
      return;
    }
    this.conditions = [];
    this.procedures = [];
    this.dataSet = [];

    this.loadingVisible = true;
    this.conditionRestService.fetchAll({}, patient.id).subscribe(next => {
      this.conditions = this.conditions.concat(next);
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
      this.procedures = this.procedures.concat(next);
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

  onRawData(data) {
    this.data = data;
    this.popupVisible = true;
  }

}
