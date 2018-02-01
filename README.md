# Esca
A simple project using angularjs, angular material, and angularfire2 to build a website for storing and sharing recipes.

## License
This project is licensed under the MIT license, a full copy of which can be found in `LICENSE.md`.

## Documentation
Documentation can be auto-generated using the [compodoc](https://compodoc.github.io/website) tool.

## Deploy
This project can be deployed using the `firebase-tools` package (which needs to be installed and set up seperately) by running `sudo npm run deploy`. It is occasionally worthwhile to run `sudo npm run clean-dist` after such an operation. The `deploy` script will run `npm run build-prod` before deploying the results via `sudo firebase deploy`.

## Angular CLI
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0. The currently used Angular CLI version can be found within `package.json`.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build-prod` script to create a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
