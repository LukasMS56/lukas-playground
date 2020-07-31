import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ARTICLES } from '../offline-articles';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  articles = ARTICLES;
  myControl: FormControl = new FormControl();
  options = [
    'Programming',
    'Wakeboarding',
    'Basketball',
    'Bouldern',
    'Squash'
  ];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Programming', cols: 2, rows: 1, image: ARTICLES[0].imgURL  },
          { title: 'Wakeboarding', cols: 2, rows: 1, image: ARTICLES[1].imgURL  },
          { title: 'Basketball', cols: 2, rows: 1, image: ARTICLES[2].imgURL  },
          { title: 'Bouldern', cols: 2, rows: 1, image: ARTICLES[3].imgURL  },
          { title: 'Squash', cols: 2, rows: 1, image: ARTICLES[4].imgURL  }
        ];
      }

      return [
        { title: 'Programming', cols: 1, rows: 1, image: ARTICLES[0].imgURL },
        { title: 'Wakeboarding', cols: 1, rows: 1, image: ARTICLES[1].imgURL },
        { title: 'Basketball', cols: 1, rows: 1, image: ARTICLES[2].imgURL },
        { title: 'Bouldern', cols: 1, rows: 1, image: ARTICLES[3].imgURL },
        { title: 'Squash', cols: 1, rows: 1, image: ARTICLES[4].imgURL }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
  
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
