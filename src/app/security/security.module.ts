import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LcAuthService } from './lc-auth/lc-auth.service';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LoggedInGuard } from './auth-guards/logged-in.guard';
import { OktaService } from './lc-auth/okta/okta.service';
import { Http, RequestOptions } from '@angular/http';
import { UserService } from './lc-auth/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LcAuthService,
    LoggedInGuard, OktaService, JwtHelperService, UserService
  ],
  declarations: [LoginComponent, UnauthorizedComponent]
})
export class SecurityModule { }
