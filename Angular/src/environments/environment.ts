// FT: In environment putting only the variables which are different in dev and prod, and which the client would change ocasionaly so we don't need to redeploy the app
export const environment = {
    production: false,
    apiUrl: 'https://localhost:44388/api',
    frontendUrl: 'http://localhost:4200',
    googleClientId: '24372003240-44eprq8dn4s0b5f30i18tqksep60uk5u.apps.googleusercontent.com',
    companyName: 'Playerty Loyals',
    primaryColor: '#111b2c',
  };