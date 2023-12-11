import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate, CanMatch {
  constructor(private authS: AuthService, private route: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authS.checkAuthentication().pipe(
      tap((isAuthenticated) =>
        console.log('isAuthenticated: ', isAuthenticated)
      ),
      tap((isAuthenticated: any) => {
        if (isAuthenticated) this.route.navigate(['./']);
      }),
      map((isAuthenticated) => !isAuthenticated)
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
}
