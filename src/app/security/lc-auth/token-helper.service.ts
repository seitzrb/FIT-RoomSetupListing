import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenHelperService {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  isTokenExpired(token: string) {
    return !this.jwtHelper.isTokenExpired(token);
  }

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
}
