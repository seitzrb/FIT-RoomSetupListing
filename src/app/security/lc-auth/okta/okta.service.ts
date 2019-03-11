import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { OktaConfig } from './okta-config';

@Injectable()
export class OktaService {
  widget;

  constructor() {
    this.widget = new OktaSignIn({
      baseUrl: OktaConfig.url,
      clientId: OktaConfig.clientId,
      features: {
        rememberMe: true,
        smsRecovery: true,
        multiOptionalFactorEnroll: true
      },
      redirectUri: this.getRedirctUri(),
      authParams: {
        responseType: 'token',
        responseMode: 'okta_post_message',
        issuer: OktaConfig.issuer,
        authorizeUrl: OktaConfig.authorizeUrl,
        scopes: [
          'openid',
          'email',
          'profile',
          'address',
          'phone'
        ]
      }
    });
  }

  getWidget() {
    return this.widget;
  }

  getRedirctUri() {
    if (environment.appDomain === 'localhost:4200') {
      return 'http://' + environment.appDomain + '/';
    } else {
      return 'https://' + environment.appDomain + '/';
    }
  }
}
