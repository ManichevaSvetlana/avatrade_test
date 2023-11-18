# Vue Authentication App
This Vue application, built with TypeScript, demonstrates a simple authentication flow with two primary views: 
- Login;
- Deposit. 

It's designed as a part of an assignment to showcase Vue capabilities along with TypeScript integration.


## Features

### Two Main Views:
- **Login**: Allows users to enter a username and password.
- **Deposit**: Accessible only to authenticated users, containing a form for credit card information.

### Authentication: 

- Implements a fake API call for user authentication. 
- Authenticated state persists across browser refreshes and closures.
- Form Validation: Basic 'field is required' validations on blur and submit events.
- State Management: Utilizes Vuex for managing authentication data.

### Design:
The design follows a provided Figma template for the Signup page and a similar structure for the Deposit page.

## Project Setup

- Copy the repository
```
git clone https://github.com/ManichevaSvetlana/avatrade_test.git
```

- Install dependencies
```
npm install
```

- Compiles and hot-reloads for development
```
npm run serve
```

- Compiles and minifies for production
```
npm run build
```

## Views

### Login View
- Username and Password fields.
- Correct credentials: email: `test@test.com`, password: `password`.
- Fake API authentication call.
- Redirects to Deposit view upon successful login. 

### Deposit View
- Credit Card, CVV, and Expiry Date fields.
- Basic validation on fields.
- Console prints the field values on submit.
- Accessible only if the user is authenticated.

## Notes

- No third-party libraries were used except Vue and vanilla JS/TS.
- The code is structured to be modular and organized, adhering to modern JS/TS practices.

## Dependencies
- Vue 3 Composition API
- TypeScript
- Vuex
- Vue Router
