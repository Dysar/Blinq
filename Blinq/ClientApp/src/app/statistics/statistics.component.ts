import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  /** Based on the screen size, switch from standard to one column per row */
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

  constructor(private breakpointObserver: BreakpointObserver) {}
}
