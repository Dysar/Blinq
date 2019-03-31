import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient) {}
  //resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Email', 'Title', 'URL'];

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoMonitoringData();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          //this.resultsLength = data.total_count;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        console.log(data);
        return this.dataSource.data = data;
      });
  }
}

export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoMonitoringData(): Observable<MonitoringData[]> {
    
    const url = `${environment.serverUrl}/api/MonitoringData`;

    const res = this.http.get<MonitoringData[]>(url);
    console.log(res);
    return res;
  }
}

export interface MonitoringData {
  Id: string;
  Email: string;
	Title: string;
  URL: string;
}

