import { RoomListComponent } from './rooms/roomList.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { UnauthorizedComponent } from './security/unauthorized/unauthorized.component';
import { SecuredDemoComponent } from './secured-demo/secured-demo.component';
import { LoggedInGuard } from './security/auth-guards/logged-in.guard';
import { HttpExampleComponent } from './http-example/http-example.component';
import { AnyRolesGuard } from './security/auth-guards/any-roles.guard';


export const routerConfig: Routes = [
  {
    path: 'roomList',
    component: RoomListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'demo',
    component: HttpExampleComponent
  },
  { // Just an example of a component requiring a logged in user to navigate to
    path: 'secure',
    component: SecuredDemoComponent,
    canActivate: [LoggedInGuard]
  },
  {
    // Here's an example of the same Secured Demo Component using the AnyRolesGuard, which
    // passes the Admin, User, and Tester role to the guard to check that the current user has those
    // before they can continue
    path: 'anotherexample',
    component: SecuredDemoComponent,
    canActivate: [AnyRolesGuard],
    data: {roles: ['Admin', 'User', 'Tester']}
  },
  {
    path: '',
    children: []
  }
];
