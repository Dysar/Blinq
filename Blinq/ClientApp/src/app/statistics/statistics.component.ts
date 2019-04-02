import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartsService } from '../charts.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  /** Based on the screen size, switch from standard to one column per row */
  chart: Chart;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Daily Stats', cols: 1, rows: 1 },
          { title: 'Monthly Stats', cols: 1, rows: 1 },
          { title: 'Annual Stats', cols: 1, rows: 1 },
          { title: 'Personal Stats', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Daily Stats', cols: 2, rows: 1 },
        { title: 'Monthly Stats', cols: 1, rows: 1 },
        { title: 'Annual Stats', cols: 1, rows: 2 },
        { title: 'Personal Stats', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private _chart: ChartsService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this._chart.dailyChart()
      .subscribe(r => {
        r.forEach(x => console.log(x));
        let mainData = r.map(o => o.wastedTime);
        let chartLabels = r.map(o => o.name);
        console.log(mainData);
        console.log(chartLabels);
        this.chart = new Chart('dailyPie',
          {
            type: 'pie',
            data: {
              datasets: [
                {
                  data: mainData
                }
              ],
              labels: chartLabels,
            },
            options: {
              legend: {
                display: true
              },
              cutoutPercentage: 0
            }
          });
      });
  }

}
