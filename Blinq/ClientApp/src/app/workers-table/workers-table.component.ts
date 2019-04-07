import { Component, AfterViewInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  name: string;
  lastname: string;
  email: string;
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient, public dialog: MatDialog) { }
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      data: { name: this.name, lastname: this.lastname, email: this.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'workers-table.component-dialog',
  templateUrl: 'workers-table.component-dialog.html',
  styleUrls: ['./workers-table.component.css']
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  onNoClick(): void {
    this.dialogRef.close();
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

export interface DialogData {
  name: string;
  lastname: string;
  email: string;
}
