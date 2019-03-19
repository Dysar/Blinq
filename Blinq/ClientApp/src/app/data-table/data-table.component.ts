import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<MonitoringData>;
  baseUrl: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['OS', 'Computer', 'User', "Title", "Executable", "URL"];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl
  }


  ngOnInit() {
    // this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    this.http.get<MonitoringData[]>(this.baseUrl + 'api/MonitoringDatas').subscribe(result => {
      console.log(new MatTableDataSource < MonitoringData >(result))
      this.dataSource = new MatTableDataSource < MonitoringData >(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => console.error(error));
  }
}


interface MonitoringData {
  OS: string; 
  Computer: string;
  User: string;
  Title: string;
  Executable: string;
  URL: string;
}