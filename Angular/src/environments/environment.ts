import { HttpHeaders, HttpParams } from "@angular/common/http";

export const environment = {
    production: false,
    apiUrl: 'https://localhost:44388/api',
    frontendUrl: 'http://localhost:4200',
    googleAuth: true,
    googleClientId: '24372003240-44eprq8dn4s0b5f30i18tqksep60uk5u.apps.googleusercontent.com',
    companyName: 'Playerty Loyals',
    usersCanRegister: true,
    httpOptions: {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    },
    httpSkipSpinnerOptions: {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().set('X-Skip-Spinner', 'true')
    },

    /* URLs */
    loginSlug: 'auth/login',
    partnerSelectSlug: 'partner-select',
    administrationSlug: 'administration',
    partnerAdministrationSlug: 'partner-administration',

    /* Local storage */
    partnerSlugKey: 'partner_slug',
    accessTokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
    browserIdKey: 'browser_id',

    /* Query params */
    partnerParamKey: 'partner'
  };