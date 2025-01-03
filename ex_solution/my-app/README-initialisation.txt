initialisation/création appli:
--------------------------------
ng new --no-standalone my-app
SCSS/saas
Enable SSR: true

==============================
intégration de bootstrap css
---------------------------
npm install -s bootstrap
npm install -s bootstrap-icons
et ajout dans premiere partie "styles: [ … ] et angular.json
de
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/bootstrap-icons/font/bootstrap-icons.css"
===============================
acceptation localStorage avec angular 17+
-------------------------------------
encadrer cela via if (isPlatformBrowser(this.platform)) { …}

==============================
intégration de l'extension material (pour onglets)
---------------------------------------
ng add @angular/material
et on ajoute dans src/app/app.module.ts
import {MatTabsModule} from '@angular/material/tabs';
et
imports: [
   ...,
    MatTabsModule,
     ],...

================================================
config automatique du reverse-proxy en mode dev :
-----------------------------------
Ajouter si besoin 
   "options": {
            "proxyConfig": "proxy.conf.json"
            }
dans "serve": de angular.json près de la ligne 75

=================================
intégration de l'extension angular-oauth2-oidc pour authentification via oauth2/oidc
--------------------------------
npm i -s angular-oauth2-oidc

* add a copy of silent-refresh.html in /src
et ajouter "src/silent-refresh.html" dans le premier bloc assets de angular.json (près de la ligne 40)
"assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              "src/silent-refresh.html"
            ],

* add OAuthModule.forRoot() in imports[] of app.module.ts with import { OAuthModule } from 'angular-oauth2-oidc'; 
+ code de Oauth2LogInOutComponent , service/OAuth2SessionService , data/UserInSession 
et tenir compte du fait que le token s'appelle "access_token" (et pas token si authToken) dans intercepteur et/ou gardien

============================

npm install --save-dev cypress
npx cypress open
ou bien
npx cypress run --spec "cypress/e2e/myTest.spec.cy.js" --browser firefox >test_report.txt
===============
pour éviter conflit entre cypress et angular,
il faut ajouter ceci dans tsconfig.json:
    ,
    "exclude": [
      "cypress.config.ts",
      "cypress/**/*.ts"
    ]
==================

ng build 
ou bien
ng build --base-href=.
           

 



