import { User } from './../security/lc-auth/user';
import { Component, OnInit } from '@angular/core';
import { LcAuthService } from '../security/lc-auth/lc-auth.service';
import { Router } from '@angular/router';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public lcAuth: LcAuthService, private router: Router) {
  }

  user: User;

  ngOnInit() {

  }

  loginClicked() {
  if (this.lcAuth.loggedIn()) {
      this.lcAuth.logout();
    } else {
      this.router.navigate(['login']);
    }
  }

  loginButtonString(): string {
    if (this.lcAuth.loggedIn()) {
        return 'Logout';
    } else {
      return 'Login';
    }
  }

  isAdmin(): boolean {
    if (!this.lcAuth.loggedIn()) {
      return false;
    } else {
      return this.lcAuth.userHasRole('Admin');
    }
  }
}

