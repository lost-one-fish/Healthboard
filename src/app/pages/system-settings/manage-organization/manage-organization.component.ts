import { Component, OnInit } from '@angular/core';
import { SmartTableService } from "../../../@core/data/smart-table.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: 'ngx-manage-organization',
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.scss']
})
export class ManageOrganizationComponent implements OnInit {

  settings = {
    actions: {
      columnTitle: '',
      add: false
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: '編號',
        type: 'number',
        width: '45%',
        filter: false
      },
      name: {
        title: '名稱',
        type: 'string',
        width: '45%',
        filter: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnInit() {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
