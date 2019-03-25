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
  selector: 'golang-datatable',
  templateUrl: './golang-datatable.component.html',
  styleUrls: ['./golang-datatable.component.css']
})
export class GolangDatatableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient) {}
  //resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['OS','Computer', 'User', 'Title', 'Executable', 'URL'];

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoMD();
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
      ).subscribe(data => this.dataSource.data = data);
  }
}

export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoMD(): Observable<MD[]> {
    
    const requestUrl = `${environment.serverUrl}/user-data`;

    return this.http.get<MD[]>(requestUrl);
  }
}

export interface MD {
  OS: string;
  Computer: string;
	User: string;
	Title: string;
	Executable: string;
  URL: string;
}
