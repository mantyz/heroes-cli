import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
  constructor(private http: HttpClient) { }

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`api/heroes/?name=${term}`, { responseType: 'json' })
      .pipe(map(response => response as Hero[]));
  }
}
