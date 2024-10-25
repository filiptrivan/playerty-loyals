import { HttpHeaders, HttpParams } from "@angular/common/http";

export const environment = {
    production: true,
    apiUrl: 'https://playerty-loyals-aagjh0fpgqfddceg.polandcentral-01.azurewebsites.net/api',
    frontendUrl: 'https://playerty-loyals.vercel.app',
    googleAuth: true,
    googleClientId: '24372003240-44eprq8dn4s0b5f30i18tqksep60uk5u.apps.googleusercontent.com',
    companyName: 'Playerty Loyalse',
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