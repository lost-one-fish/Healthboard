import { Component, OnInit } from '@angular/core';
import { PatientRestService } from '../../../@fhir/patient-rest.service';

@Component({
  selector: 'ngx-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css'],
})
export class CasesComponent implements OnInit {

  private dataSet: Object = {};
  private sort = {
    sorts: [], column: {}, prevValue: '', newValue: '',
  };

  localizationMessage = {
    emptyMessage: '未找到任何資料！',
    totalMessage: '筆記錄',
    selectedMessage: '已選擇',
  };

  selectedRow;
  rows = [];
  count = 0;
  limit = 10;
  offset = 0;
  loading = false;
  keyword = '';

  constructor(private patientService: PatientRestService) {
  }

  ngOnInit() {
    this.fetchList(0);
  }

  private fetchList(page: number) {
    this.offset = page;
    this.loading = true;
    try {
      if (!this.dataSet[page]) {
        if (this.keyword && !this.sort.sorts[0]) {
          // TODO
        } else if (this.sort.sorts[0]) {
        } else {
          this.patientService.fetchAll('Patient').subscribe(
            bundles => {
              this.storageData(bundles[0], page);
            },
            err => {
              console.error(err);
              this.loading = false;
            });
        }
      } else {
        this.restoreData(page);
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
    }
  }

  private storageData(bundle, page) {
    if (bundle.total > 0) {
      this.count = bundle.total;
    }
    try {
      this.dataSet[page] = bundle.entry;

      this.restoreData(page);
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }

  private restoreData(page) {
    this.rows = [];
    try {
      if (this.dataSet[page]) {
        this.rows = this.dataSet[page];
      }
    } catch (e) {
      console.error(e);
    }
  }

  onSort(event) {
    this.sort = event;

    this.dataSet = [];
    this.fetchList(0);
  }

  onPage(page) {
    this.fetchList(page.offset);
  }

  onActivate(event): void {
    if (event.type === 'click') {
      this.selectedRow = event.row;
    }
  }

}
