import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private url: string = environment.URL;
  constructor(private http: HttpClient) {}

  getHeroe(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.url}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSUggestion(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes?q=${query}&_limit=6`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.url}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.url}/heroes/${hero.id}`, hero);
  }

  deleteteHero(id: string): Observable<boolean> {
    return this.http.delete(`${this.url}/heroes/${id}`).pipe(
      map((resp) => true),
      catchError((error) => of(false))
    );
  }
}
