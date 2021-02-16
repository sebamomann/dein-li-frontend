(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["production"] = true;

  window["env"]["API_URL"] = "http://localhost:3000/";
  window["env"]["BASE_URL"] = "https://localhost:4200/";

  window['env']['KEYCLOAK_URL'] = 'https://account.sebamomann.de/auth/';
  window['env']['KEYCLOAK_REALM'] = 'test';
  window['env']['KEYCLOAK_REDIRECT_URI'] = 'https://localhost:4200/';
  window['env']['KEYCLOAK_POST_LOGOUT_REDIRECT_URI'] = 'https://localhost:4200/';
  window['env']['KEYCLOAK_CLIENT_ID'] = 'test';
  window['env']['KEYCLOAK_RESPONSE_TYPE'] = 'code';
  window['env']['KEYCLOAK_SCOPE'] = 'openid profile email';
})(this);
