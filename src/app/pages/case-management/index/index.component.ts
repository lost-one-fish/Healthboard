import { Component, OnInit } from '@angular/core';
import { PatientRestService } from '../../../@fhir/patient-rest.service';
import notify from '../../../../../node_modules/devextreme/ui/notify';

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
    this.fetchData();
  }

  onCreatePatient(resource) {
    this.patientService.create({
      resource: resource,
    }).subscribe(next => {
      notify('新增成功');

      let created: boolean = true;
      this.dataSet = this.dataSet.map(item => {
        if (item.id === resource.id) {
          created = false;
          return Object.assign({}, item, resource);
        } else {
          return item;
        }
      });
      if (created) {
        this.dataSet.reverse();
        this.dataSet.push(next.data);
        this.dataSet.reverse();
      }
    });
  }

  onUpdatePatient(resource) {
    this.patientService.update({
      resource: resource,
    }).subscribe(next => {
      notify('更新成功');

      this.dataSet = this.dataSet.map(item => {
        if (item.id === resource.id) {
          return Object.assign({}, item, resource);
        } else {
          return item;
        }
      });
    });
  }

  onDeletePatient(resource) {
    this.patientService.delete({
      resource: resource,
    }).subscribe(next => {
      notify('刪除成功');
    });
  }

  fetchData() {
    this.dataSet = [];
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
