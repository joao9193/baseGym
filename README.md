# Welcome to Base Gym

## Quick Links

[Getting Started Guide](#get-started)

[Users API](#users-api)

---
## Get Started
### Installation
Clone from GitHub

cd into /functions

run `npm install`

### Run the server
Run `npm run serve`

> You may have to install firebase-tools globally to get serve to work `npm install -g firebase-tools`

---

## Users API

[See the Postman Documentation](https://documenter.getpostman.com/view/10044845/UzJFuHaX)

> Because this is a personal project using GCP and Firebase, the URL's will not be made public as to not incure unnecessary costs. API documentation is purely for demonstration purposes

### Create Email User
Endpoint: **POST** `/users-createEmailUser`

Example body:
```
{
    "email": "example@email.com",
    "password": "test12"
}
```

Example response:
```
{
    "message": "Successfully created email user",
    "user": {
        "uid": "yOQm...",
        "email": "example@email.com",
        "emailVerified": false,
        "isAnonymous": false,
        "providerData": [
            {
                "providerId": "password",
                "uid": "example@email.com",
                "displayName": null,
                "email": "example@email.com",
                "phoneNumber": null,
                "photoURL": null
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AIwUaOkU...",
            "accessToken": "eyJhbGciO...",
            "expirationTime": 1656804060344
        },
        "createdAt": "1656800460165",
        "lastLoginAt": "1656800460165",
        "apiKey": "AI...",
        "appName": "[DEFAULT]"
    }
}
```

### Login Email User
Endpoint: **POST** `/users-signInEmailUser`

Example body:
```
{
    "email": "example@email.com",
    "password": "test12"
}
```

Example response:
```
{
    "message": "Successfully created email user",
    "user": {
        "uid": "yOQm...",
        "email": "example@email.com",
        "emailVerified": false,
        "isAnonymous": false,
        "providerData": [
            {
                "providerId": "password",
                "uid": "example@email.com",
                "displayName": null,
                "email": "example@email.com",
                "phoneNumber": null,
                "photoURL": null
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AIwUaOkU...",
            "accessToken": "eyJhbGciO...",
            "expirationTime": 1656804060344
        },
        "createdAt": "1656800460165",
        "lastLoginAt": "1656800460165",
        "apiKey": "AIza...",
        "appName": "[DEFAULT]"
    }
}
```

### Signout User
Endpoint: **GET** `/users-signoutUser`

Example response:
```
{
    "message": "Successfully signed out"
}
```
