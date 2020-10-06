# WalletApp

I have created this app as my first project that is written in Angular and have back end service based on PHP and MySQL.

This features have been implemented:
  1. Creating new accounts
  2. Signing in
  3. Creating wallets
  4. Editing wallets
  5. Deleting wallets
  6. Withdraw and deposit money from wallets
  7. History module
  8. Success and failure messages
  9. Logging out
  10. Editing data about account's user
  11. Changing password
  12. Deleting account
  13. Validation in forms
  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

Back end service:
  -XAMPP v3.2.4
  -PHP 7.3.9
  -MySQL 15.1

# Setup

1. Create new Angular project
2. Fetch Github project to your new Angular project
3. Set up (local) server with domain for back end service (PHP + MySQL).
4. Copy all files from /src/php/ to server.
5. Set up database using MySQL script from /src/dbscript.php.
6. Fill data on server in /src/php/database_config.php.
7. Run two PHP scripts on server that fills database constant data about currencies and countries: "import_countries.php" and "import_currencies.php". For second one you have to set up path for /src/assets/currencies.json file.
8. In Angular project set up /src/environments/environment.ts variable apiUrl to domain for php service scripts.
9. Build Angular project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
