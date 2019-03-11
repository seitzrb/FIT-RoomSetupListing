import { RoomListComponent } from './rooms/roomList.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { SecuredDemoComponent } from './secured-demo/secured-demo.component';
import { CoreModule } from './core/core.module';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LcAuthService } from './security/lc-auth/lc-auth.service';
import { HttpExampleComponent } from './http-example/http-example.component';
import { NavbarComponent } from './navbar/navbar.component';


export function jwtOptionsFactory(authService) {
  return {
    tokenGetter: () => {
      return authService.getAccessToken();
    },
    whitelistedDomains: ['yourApiDomainHere']
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SecuredDemoComponent,
    HttpExampleComponent,
    RoomListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SecurityModule,
    CoreModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LcAuthService]
      }
    })
  ],
  providers: [LcAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
