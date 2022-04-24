import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authSer: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authSer.user.pipe(
      take(1),
      map((_user) => {
        const auth = !!_user;
        if (auth) {
          return !!_user;
        }
        return this.router.createUrlTree(['./auth']);
      })
      // ,
      // tap(isAuth => {
      //   if (!isAuth) {
      //     return this.router.createUrlTree(['./auth']);
      //   }
      // })
    );
  }
}
