import { initializeApp } from "firebase/app";
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN_KEY,
    projectId: process.env.PROJ_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };

//App has to be initialized before the getAuth() function is called in our other functions
export const app = initializeApp(firebaseConfig);

import users from './users/users';

export {
    users
}
