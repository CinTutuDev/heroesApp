import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private authS: AuthService, private route: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authS.checkAuthentication().pipe(
      tap((isAuthenticated) =>
        console.log('isAuthenticated: ', isAuthenticated)
      ),
      tap((isAuthenticated: any) => {
        if (!isAuthenticated) this.route.navigate(['./auth/login']);
      })
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    /*  console.log('Can Match');
    console.log({ route, segments });
    return false; */
    return this.checkAuthStatus();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    /*   console.log('Can Activate');
    console.log({ route, state });
    return true; */
    return this.checkAuthStatus();
  }
}
