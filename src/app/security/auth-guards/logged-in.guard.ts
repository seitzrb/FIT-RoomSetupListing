import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LcAuthService } from '../lc-auth/lc-auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private router: Router,
    private lcAuth: LcAuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.lcAuth.loggedIn()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.lcAuth.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;

    /*
    I don't think we need this. If they're not logged in above, they get redirected to the login.
    Login component calls logMeIn which will attempt the session login if turned on, and redirect to where
    the user was trying to go
    const promise = new Promise<boolean>((resolve, reject) => {
      if (this.lcAuth.loggedIn()) {
        // logged in so return true
        resolve(true);
      } else {
        this.lcAuth.sessionLogin()
          .then((res) => {
            if (res) {
              resolve(true);
            } else {
              this.router.navigate(['/login']);
              resolve(false);
            }
          })
          .catch((err) => {
            this.router.navigate(['/login']);
            resolve(false);
          });
      }
    });

    return promise;
    */
  }
}
