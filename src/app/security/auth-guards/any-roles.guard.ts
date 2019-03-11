import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LcAuthService } from '../lc-auth/lc-auth.service';

@Injectable()
export class AnyRolesGuard implements CanActivate {

  constructor(
    private router: Router,
    private lcAuth: LcAuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = route.data.roles;

    if (this.lcAuth.loggedIn()) {
      // logged in so return true
      return this.lcAuth.userHasAnyRole(roles);
    }

    // not logged in so redirect to login page
    this.lcAuth.setRedirectUrl(state.url);
    this.router.navigate(['/login']);
    return false;
  }
}
