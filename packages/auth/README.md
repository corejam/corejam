# JWT GraphQL Authentication

This package provides basic GraphQL JWT authentication functionality for bootstrapping Corejam applications along with the relevant barebones web components to bootstrap your application with authentication.

This package also makes use of the [@corejam/notify](../../notify/README.md) package to send verification / reset password emails.

## Installation

### npm

```bash
npm i @corejam/plugin-auth
```

### yarn

```bash
yarn add @corejam/plugin-auth
```

## Components

This module provides a few barebones web components to handle most of the needed authentication functionality for the frontend. You can simply plug them into your Corejam project or use the API manualy below to create your own.

### Identity

To quickly bootstrap your app simply include the identity component inside your app (Preferably in your layout).

```html
<corejam-identity></corejam-identity>
```

This provides a quick login dropdown and logged in state for your application:

<img width="200px" src="https://i.imgur.com/kHmFp4b.gif" />

## Routes

The following ready to go routes are available to quickly tie into your application:

```html
<cj-route-register></cj-route-register>
```

```html
<cj-route-login></cj-route-login>
```

```html
<cj-route-admin-user-form></cj-route-admin-user-form>
```

```html
<cj-route-admin page="{1}"></cj-route-admin>
```

```html
<corejam-auth-route-account></corejam-auth-route-account>
```

<img style="max-width:450px" src="https://i.imgur.com/aytjp5V.png"/>

# Manual API Usage

### Authenticate

To authenticate a user run the following mutation:

```graphql
mutation {
  userAuthenticate(email: "test@test.com", password: "valid123Password@") {
    user {
      id
      email
    }
    token
  }
}
```

If authentication is successful the user object along with a token is returned which you should store in your application state. A `refreshToken` is sent as secure cookie which can be used for reauthentication at a later stage.

### Refreshing JWT token

To refresh the token call the following mutation with the `refreshToken` cookie active.

```graphql
mutation {
  userTokenRefresh {
    user {
      id
      email
    }
    token
  }
}
```

### Paginate Users

```graphql
{
  paginateUsers(page: 1, size: 20) {
    perPage
    totalItems
    currentPage
    lastPage
    items {
      id
      email
    }
  }
}
```
