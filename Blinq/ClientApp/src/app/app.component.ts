import { Component } from '@angular/core';
import { ChartsService } from './charts.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _chart: ChartsService) { }

  ngOnInit() {
    this._chart.dailyChart()
      .subscribe(r => console.log(r));
  }
}
