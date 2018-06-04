import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../../shared/services/fhir/organizations.service';

@Component({
  selector: 'ngx-manage-organization',
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.scss']
})
export class ManageOrganizationComponent implements OnInit {

  private dataSet: Object = {};
  private sort = {
    sorts: [], column: {}, prevValue: '', newValue: '',
  };

  rows = [];
  count = 0;
  limit = 10;
  offset = 0;
  loading = false;
  keyword = '';

  constructor(private organizationsService: OrganizationsService) {
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
          this.organizationsService.findByName(this.keyword, page, this.limit).subscribe(
            bundles => this.storageData(bundles[0], page),
            err => {
              console.error(err);
              this.loading = false;
            });
        } else if (this.sort.sorts[0]) {
          this.organizationsService.sort(this.sort.sorts[0].prop, this.sort.sorts[0].dir, page, this.limit).subscribe(
            bundles => {
              this.storageData(bundles[0], page);
            },
            err => {
              console.error(err);
              this.loading = false;
            }
          );
        } else {
          this.organizationsService.findAll(page, this.limit).subscribe(
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
}
