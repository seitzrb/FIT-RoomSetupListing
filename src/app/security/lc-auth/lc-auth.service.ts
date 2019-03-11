import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { environment } from '../../../environments/environment';
// import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { OktaService } from './okta/okta.service';
import { UserService } from './user.service';
import { TokenHelperService } from './token-helper.service';
import * as OktaAuth from '@okta/okta-auth-js';
import { OktaConfig } from './okta/okta-config';

@Injectable()
export class LcAuthService {
  user: User;
  oktaSignIn;
  token: any;
  redirectUrl = '';
  useSessionSignOn = true;
  gettingSession = false;

  constructor(
    private oktaService: OktaService,
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone,
    private tokenHelper: TokenHelperService
  ) {
    this.oktaSignIn = oktaService.getWidget();
    this.oktaSignIn.tokenManager.on('refreshed', this.tokenRefreshed);
  }

  tokenGetter() {
    return this.getAccessToken();
  }

  tokenRefreshed(key, newToken, oldToken) {
    this.token = newToken;
  }

  getAccessToken() {
    const temp = this.oktaSignIn.tokenManager.get('token');
    if (temp) {
      return temp.accessToken;
    }
    return null;
  }

  /** Check to see if the current user is logged in. */
  loggedIn(tokenName: string = 'token'): boolean {
    const a = this.oktaSignIn.tokenManager.get(tokenName);

    try {
      if (!a || a === null) {
        return false;
      } else {
        return this.tokenHelper.isTokenExpired(a.accessToken);
      }
    } catch (error) {
      return false;
    }
  }

  setNewToken(token: any) {
    // The angular-jwt is now set up to pull everything from the tokenManager as it auto-refreshes the token
    this.oktaSignIn.tokenManager.clear();
    this.oktaSignIn.tokenManager.add('token', token);
  }

  clearToken() {
    this.oktaSignIn.tokenManager.clear();
  }

  /** Gets the user and roles from our own database.
   * Only needed if doing role based authorization */
  getLCUser(redirect = false) {
    this.userService
      .getLoggedInUser()
      .subscribe(
        (u) => {
            this.user = u;
            this.setUser(u);
            if (redirect) {
              if (this.redirectUrl.length > 0) {
                this.router.navigateByUrl(this.redirectUrl);
              } else {
                this.router.navigate(['/home']);
              }
            }
          },
        (err) => console.log(err)
      );
  }

  logMeIn() {
    if (this.loggedIn()) {
      this.navigateHome();
    } else {
      if (this.useSessionSignOn) {
        this.sessionLogin()
          .then((res) => {
            if (res) {
              this.navigateHome();
            } else {
              this.showLogin();
            }
          })
          .catch((errO => {
            this.showLogin();
          }));
      } else {
        this.showLogin();
      }
    }
  }

  navigateHome() {
    if (this.redirectUrl.length > 0) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/home']);
    }
  }

  afterLogin() {

  }

  /** This is the function that shows the okta login. This is called from the login page  */
  showLogin() {
    this.clearLoggedInInfo();
    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl({ el: '#okta-login-container' }, response => {
      if (response.status === 'SUCCESS') {
        // The ngZone improves the change detection and prevents the okta widget from hanging
        this.ngZone.run(() => {
          this.token = response.accessToken;
          this.setNewToken(response);

          // Uncomment this if you need role based authentication and need to pull roles from an LC database
          // this.getLCUser(true);
          this.navigateHome();
        });
      }
    });
  }

  sessionLogin(): Promise<boolean> {
    this.gettingSession = true;
    const promise = new Promise<boolean>((resolve, reject) => {
      this.oktaSignIn.session.get((response) => {
        if (response.status === 'ACTIVE') {
          const authClient = new OktaAuth({
            url: OktaConfig.url,
            clientId: OktaConfig.clientId,
            redirectUri: this.oktaService.getRedirctUri(),
            issuer: OktaConfig.issuer,
            authorizeUrl: OktaConfig.authorizeUrl
          });

          authClient.token.getWithoutPrompt({
              responseType: ['token'], // or array of types
              scopes: ['openid', 'email', 'profile', 'address', 'phone', 'groups', 'offline_access', 'ADGroups']
          })
          .then((token) => {
            // Add Token To Token Manager
            if (token && token[0]) {
              this.setNewToken(token[0]);
              this.gettingSession = false;
              resolve(true);
            } else {
              this.gettingSession = false;
              resolve(false);
            }
          })
          .catch(function(err) {
              console.log('Error while getting tokens--', err);
              reject();
          });
        } else {
          this.gettingSession = false;
          reject();
        }
      });
    });

    return promise;
  }

  /** Sets the user in the service and into local storage. */
  setUser(user: User) {
    this.user = user;
    localStorage.setItem('LCUser', JSON.stringify(user));
  }

  /** Get the user from the service or local storage.
   * Returns null if both are empty/null
   */
  getUser() {
    // If the copy in the service is valid, just return it
    if (this.user) {
      return this.user;
    }
    // If not, grab it from local storage
    const userJson = localStorage.getItem('LCUser');
    if (userJson && userJson.length > 0) {
      this.user = JSON.parse(userJson);
      return this.user;
    }

    return null;
  }

  /** Returns true if the currently logged in user has the given role */
  userHasRole(roleName: string): boolean {
    const user = this.getUser();
    if (!user) {
      if (this.loggedIn()) {
        // this.getLCUser(false);
        // Return false. This may hide/prevent routing, but it's the safe way of handling it
        return false;
      }
      return false;
    }
    const role = user.userRoles.find(r => r.role.roleName === roleName);

    return role !== undefined;
  }

  userHasAnyRole(roles: string[]) {
    const user = this.getUser();
    if (!user) {
      if (this.loggedIn()) {
        // this.getLCUser(false);
        // Return false. This may hide/prevent routing, but it's the safe way of handling it
        return false;
      }
      return false;
    }

    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      const idx = user.userRoles.findIndex(r => r.role.roleName === role);

      if (idx >= 0) {
        return true;
      }
    }

    return false;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  /** Logs the user out and clears all tokens and user objects. */
  logout() {
    this.oktaSignIn.signOut(() => {
      this.ngZone.run(() => {
        this.clearLoggedInInfo();
        this.router.navigate(['/login']);
        // location.reload();
      });
    });
  }

  clearLoggedInInfo() {
    this.oktaSignIn.tokenManager.clear();
    this.setUser(null);
    this.clearToken();
    localStorage.removeItem('LCUser');
  }
}
