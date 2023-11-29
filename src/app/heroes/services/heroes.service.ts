import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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
    return this.http.get<Hero>(`${this.url}/heroes/${id}`)
    .pipe(
      catchError( error=>of(undefined) )
    )
  }

}
