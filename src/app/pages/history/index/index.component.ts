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
  conditions = [];
  procedures = [];
  conditionLoadingVisible = false;
  procedureLoadingVisible = false;

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
      this.conditions = this.conditions.filter(item => {
        return item.id !== resource.id;
      });
      this.conditions.reverse();
      this.conditions.push(next.data);
      this.conditions.reverse();
    }, error => {
      notify('新增失敗');
    }, () => {
      notify('新增成功');
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
      this.conditions = this.conditions.map(item => {
        if (item.id === resource.id) {
          return Object.assign({}, next.data);
        } else {
          return item;
        }
      });
    }, error => {
      notify('更新失敗');
    }, () => {
      notify('更新成功');
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
      this.procedures = this.procedures.filter(item => {
        return item.id !== resource.id;
      });
      this.procedures.reverse();
      this.procedures.push(next.data);
      this.procedures.reverse();
    }, error => {
      notify('新增失敗');
    }, () => {
      notify('新增成功');
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
      this.procedures = this.procedures.map(item => {
        if (item.id === resource.id) {
          return Object.assign({}, next.data);
        } else {
          return item;
        }
      });
    }, error => {
      notify('更新失敗');
    }, () => {
      notify('更新成功');
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
    this.onLoadingConditions();
    this.onLoadingProcedures();
  }

  onLoadingConditions() {
    this.conditions = [];

    this.conditionLoadingVisible = true;
    this.conditionRestService.fetchAll({}, this.patient.id).subscribe(next => {
      this.conditions = this.conditions.concat(next);
    }, err => {
      console.error(err);
    }, () => {
      this.conditionLoadingVisible = false;
    });

  }

  onLoadingProcedures() {
    this.procedures = [];

    this.procedureLoadingVisible = true;
    this.procedureRestService.fetchAll({}, this.patient.id).subscribe(next => {
      this.procedures = this.procedures.concat(next);
    }, err => {
      console.error(err);
    }, () => {
      this.procedureLoadingVisible = false;
    });
  }

  onRawData(data) {
    this.data = data;
    this.popupVisible = true;
  }

}
