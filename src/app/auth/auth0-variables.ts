interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'gI65yoSXBf1mj5wkAHjxnvBC54lHqc0B',
  domain: 'gaduo.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
