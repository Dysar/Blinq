import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ChartsService {
  baseUrl:string;
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl) {
    this.baseUrl = baseUrl;
  }

  dailyChart() {
    return this._http
      .get<UserProcess[]>(this.baseUrl + 'api/UserProcesses');
    //-----------------incomplete-----------------
  }
}

interface UserProcess {
  id: number;
  name: string;
  wastedTime: number;
}
