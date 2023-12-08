import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = environment.URL;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, passw: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', 'sdf556df4sdc3x356f4sa3'))
    );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.url}/users/1`).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError((erro) => of(false))
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
