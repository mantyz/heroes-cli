import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  results: string[];

  constructor(private heroService: HeroService, private http: HttpClient) { }

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => { this.heroes = heroes.slice(1, 5); /*console.log(this.heroes);*/ });
  }

  item(): void {
    this.http.get('/api/heroes').subscribe(data => {
      this.results = data['results'];
      console.log(this.results);
    });
  }
}
