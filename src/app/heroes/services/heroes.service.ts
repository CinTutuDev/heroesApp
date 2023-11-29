import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private url: string = environment.URL;
  constructor(private http: HttpClient) { }


  getHeroe(): Observable<Hero[]>{
    /*   return this.httpClient.get<Hero[]>(`${this.url}/heroes`) */
      return this.http.get<Hero[]>(`${this.url}/heroes`);
  }



}
