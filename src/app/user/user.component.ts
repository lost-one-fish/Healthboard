import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PatientsService } from '../fhir/patients.service';
import { BundleEntry } from '../fhir/fhir.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {

  displayedColumns = ['id', 'name', 'birthDate', 'gender'];
  dataSource: MatTableDataSource<BundleEntry>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public patientService: PatientsService) {
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.patientService.findAll(3000, 10).subscribe(bundles => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(bundles[0].entry);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
