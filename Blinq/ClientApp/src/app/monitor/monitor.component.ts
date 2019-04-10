import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { interval } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements AfterViewInit {
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient) {}
  //resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Email', 'Title', 'URL', 'Time'];

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    interval(500).subscribe(x => {
      this.exampleDatabase!.getRepoMonitoringData()
        .subscribe(data => {
          return this.dataSource.data = data;
        });
    });
  }
}

export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoMonitoringData(): Observable<MonitoringData[]> {
    
    const url = `${environment.serverUrl}/api/MonitoringData`;

    const res = this.http.get<MonitoringData[]>(url);
    return res;
  }
}

export interface MonitoringData {
  Id: string;
  Time: string;
  Email: string;
	Title: string;
  URL: string;
}

