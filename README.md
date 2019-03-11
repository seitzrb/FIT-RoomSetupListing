# LCQuickstart

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).
See the bottom of the readme for tops on how to use the CLI.

## Create a new project based on the QuickStart

Clone this repo into new project folder (e.g., `my-proj`). Then switch to the release branch
```shell
git clone https://github.com/larimercounty/FIT-LC_QuickStart  my-proj
cd my-proj
git checkout -b release origin/release 
```

This project contains all the Security items such as auth guards, a security module, and other helpful tidbits
If you don't need security right away you can just ignore it. Having the security module included won't hurt anything, but leaves the possibilities open for if/when it will be needed.

We don't want to update the quickstart apps git, so remove the git references.

Discard the `.git` folder..
```shell
rm -rf .git  # OS/X (bash)
rd .git /S/Q # windows
```

### Create a new git repo

Initialize this project as a *local git repo* and make the first commit:
```shell
git init
git checkout -b release
git add README.md
git commit -m "Initial commit"
git checkout -b dev
git add .
git commit -m "Added quickstart"
```

Grab the remote address on github (e.g. *`https://github.com/larimercounty/my-proj.git`*) and push the *local repo* to the *remote*.
```shell
git remote add origin <repo-address>
// Push release first. This makes release the default branch in github
git push -u origin release
git push -u origin dev
```

## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
// When running the application locally and Okta is being called, use this line instead of npm start. This ensures the issuer url being passed is localhost and not the server name
npm run local
```

## Update all server/app references
Change serverName and appName in all environment files.

Change appName in package.json, .angular-cli.json, and web.config.

The web config is required if hosting the site on IIS as we do. IIS must also have the extension [URL ReWrite](https://www.iis.net/downloads/microsoft/url-rewrite) installed. This makes IIS redirect all traffic back the root of the Angular app and lets Angular handle all the routing, otherwise going to a deep route will throw a 404 (ex: server/apps/appName/test/1)

Change title in index.html

Add any domains that the access token should be sent to when making API calls in app.module.ts in the whitelistedDomains array.

## Setting up Security

In order to set up the app to use the authentication:
Go to /security/lc-auth/okta/okta.service.ts and replace 'yourOKTAclientid' with the OKTA client ID for your app.

If you want to enable the single sign on feature (auto login), go to the lc-auth.service.ts file and set useSessionSignOn to true at the top of the file. This will attempt to log in the user without prompting them for un/pw.

If you are using roles/authorization:
1. Navigate to /security/lc-auth/lc-auth.service.ts and in the showLogin() function, uncomment the line calling this.getLCUser and then remove the line below it that navigates as the showLogin function can do that.

## Errors related to RXJS V6
If you get any errors related to RXJS, chances are it's due to a 3rd party package that isn't updated to utilize RXJS 6's new import syntax.
If this is the case, rxjs has provided a backwards compatibility package to fix the issue. Install it using:

npm i rxjs-compat

## Lint

Linting ensures that code has no bugs and is formatted correctly. All projects need to pass linting as this will be incorporated into the build process.
If a project does not pass linting, it will still build and run in the dev environment. 
However the CLI uses AOT (Ahead of Time Compiling) for the production build, and if it won't lint, it won't build.

The extension [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) is recommended to help with linting.
This extension will show issues that need to be fixed in the same way intellisense shows issues.

The AngularCLI supports Lint. Run the command `ng lint` at any time to lint your code. This will run over the entire code base and show any issues that need fixed. 
Linting should be done before checking in any code to Github.

Lint settings can be found in tslint.json. This project has the default settings as well as the addition of the 'lc' prefix for directives and components.
You can add other app-specific prefixes to the array found in component-selector and directive-selector. Examples: fm, abo, vw (FM-Billing, ABO-Trust, Victim Witness).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can also run `ng run local` instead of ng serve. This still calles ng serve, but it also passes the local environment parameter. This is good for running locally, but pointing the api to the dev server. 

You can add/edit the environment files to match your environment needs.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Ther are also sever scripts in the package.json set up to streamline the deployment process. These are the publish-dev/test/prod commands. These are the commands used by our build tool Jenkins, so modify those accordingly if this project will be built/deployed using Jenkins (which is recommended).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md) or the [CLI website](https://cli.angular.io/).


## Extensions for VS Code

Angular can be developed in almost any text editor/IDE. However our recomendation is VS Code. It is free, lightweight, and geared towards front end development. There are a lot of good extensions that make it even easier to use. Here are some that may be of help

[Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)  johnpapa.angular-essentials
This is a collection of extensions put together by John Papa that he felt were helpful.

[TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

# Other helpful tidbits

## Styling
We do not have a 'standard' styling library, however we'd like to keep the number of libraries used across our projects to a minimum.
The suggested libraries are:
* [Bootstrap](https://getbootstrap.com/)
* [Angular Materials](https://material.angular.io/)

## Components
We do not have a 'standard' component library either, but just like styling we'd like to keep the number we use to a minimum. Here are a few that are recommended:
* [Angular Materials](https://material.angular.io/)
* [NG-Bootstrap](https://ng-bootstrap.github.io/#/home)
* [PrimeNG](https://www.primefaces.org/primeng/#/)
* [Telerik/Kendo](http://www.telerik.com/kendo-angular-ui/) (This requires a paid license so use if the controls are needed)
