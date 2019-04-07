import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.css']
})
export class WorkersTableComponent implements AfterViewInit {
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient) { }
  //resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Name', 'Lastname', 'Email'];

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    interval(500).subscribe(x => {
      this.exampleDatabase!.getRepoMonitoringData()
        .subscribe(data => {
          console.log(data);
          return this.dataSource.data = data;
        });
    });
  }
}

export class ExampleHttpDao {
  constructor(private http: HttpClient) { }

  getRepoMonitoringData(): Observable<WorkersData[]> {

    const url = `${environment.serverUrl}/api/WorkersData`;

    const res = this.http.get<WorkersData[]>(url);
    return res;
  }
}

export interface WorkersData {
  Id: string;
  Name: string;
  Lastname: string;
  Email: string;
}
