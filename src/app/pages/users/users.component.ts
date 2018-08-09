import { Component, OnInit } from '@angular/core';
import { BodyOutputType, ToasterConfig, ToasterService } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  rows = [];
  count = 0;
  loading = false;
  selectedRow;

  limit = 10;
  offset = 0;

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'flyLeft',
    limit: 3,
    bodyOutputType: BodyOutputType.TrustedHtml,
  });

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
    this.loading = true;
    try {
      this.findAll();
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  onRowSelect(row) {
    this.selectedRow = Object.assign({}, row);
  }

  onSave(data) {
  }

  onPage(offset) {
    // 回饋 ngx-DataTable 目前選擇第幾頁
    this.offset = offset;
    // 向後端要求 page request，index = 0 為第一頁。
  }

  private findAll() {
  }
}
