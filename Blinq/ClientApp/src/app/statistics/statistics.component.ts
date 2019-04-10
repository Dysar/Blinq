import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartsService } from '../charts.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  @ViewChild("chart")
  public refChart: ElementRef;
  public chartData: any;

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

  constructor(private _chart: ChartsService, private breakpointObserver: BreakpointObserver) {
    this.chartData = {};
  }

  ngOnInit() {
    this.chartData = {
      labels: ["Yotube", "Facebuk", "Other"],
      datasets: [{
        label: '# of Votes',
        data: [50, 40, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
    //this._chart.dailyChart()
    //  .subscribe(r => {
    //    r.forEach(x => console.log(x));
    //    let mainData = r.map(o => o.wastedTime);
    //    let chartLabels = r.map(o => o.name);
    //    console.log(mainData);
    //    console.log(chartLabels);
    //    //this.chart = new Chart('dailyPie',
    //    //  {
    //    //    type: 'pie',
    //    //    data: {
    //    //      datasets: [
    //    //        {
    //    //          data: mainData
    //    //        }
    //    //      ],
    //    //      labels: chartLabels,
    //    //    },
    //    //    options: {
    //    //      legend: {
    //    //        display: true
    //    //      },
    //    //      cutoutPercentage: 0
    //    //    }
    //    //  });
    //  });
  }

  public ngAfterViewInit() {
    let chart = this.refChart.nativeElement;
    let ctx = chart.getContext("2d");
    let myChart = new Chart(ctx, {
      type: 'pie',
      data: this.chartData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
