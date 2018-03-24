import {Component, OnInit, ViewChild} from '@angular/core';
import {DevicesService} from '../fhir/devices.service';
import {merge} from 'rxjs/observable/merge';
import {startWith} from 'rxjs/operators/startWith';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {switchMap} from 'rxjs/operators/switchMap';
import {catchError} from 'rxjs/operators/catchError';
import {of as observableOf} from 'rxjs/observable/of';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  displayedColumns = ['udi.name', 'manufacturer', 'model'];
  dataSource = new MatTableDataSource();

  // MatPaginator Inputs
  length = 0;
  pageSize = 10;

  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public devicesService: DevicesService) {
  }

  ngOnInit(): void {
    this.devicesService.count().subscribe( value => {
      this.length = value;
    });

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.devicesService.findAll(this.paginator.pageIndex, this.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          return data[0];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(bundles => this.dataSource.data = bundles.entry);
  }

}
