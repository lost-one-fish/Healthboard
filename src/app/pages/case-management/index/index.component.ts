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
      this.dataSet = this.dataSet.filter(item => {
        return item.id !== resource.id;
      });
      this.dataSet.reverse();
      this.dataSet.push(next.data);
      this.dataSet.reverse();
    }, error => {
      notify('新增失敗');
    }, () => {
      notify('新增成功');
    });
  }

  onUpdatePatient(resource) {
    this.patientService.update({
      resource: resource,
    }).subscribe(next => {
      this.dataSet = this.dataSet.map(item => {
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
