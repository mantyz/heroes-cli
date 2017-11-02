import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { toPromise } from 'rxjs/operator/toPromise';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getHeroes(): Promise<Hero[]> {
    return this.http
      .get(this.heroesUrl, { responseType: 'json' })
      .toPromise()
      .then(response => response as Hero[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get(url, { responseType: 'json' })
      .toPromise()
      .then(response => response as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, hero, { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, { name: name }, { headers: this.headers })
      .toPromise()
      .then(res => res as Hero)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  /*getHeroesSlowly(): Promise<Hero[]> {
      return new Promise(resolve => {
          // Simulate server latency with 2 second delay
          setTimeout(() => resolve(this.getHeroes()), 2000);
      });
  }*/
}
