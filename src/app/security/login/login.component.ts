import { Component, OnInit } from '@angular/core';
import { LcAuthService } from '../lc-auth/lc-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    protected lcAuthService: LcAuthService
  ) { }

  ngOnInit() {
    this.lcAuthService.logMeIn();
  }
}
