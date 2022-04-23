import * as functions from "firebase-functions";
import * as firebaseAuth from "firebase/auth";
import { app } from '../index';

const auth = firebaseAuth.getAuth(app);

const createEmailUser = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    console.log('request', request.body);
    firebaseAuth.createUserWithEmailAndPassword(auth, request.body.email, request.body.password)
    .then((userCredential) => {
        response.status(200).send({ message: "Successfully created email user", user: userCredential.user });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        response.status(400).send({ errorCode, errorMessage });
    });
});

const signInEmailUser = functions.https.onRequest((request, response) => {
    firebaseAuth.signInWithEmailAndPassword(auth, request.body.email, request.body.password)
    .then((userCredential) => {
        response.status(200).send({ message: "Successfully signed in", user: userCredential.user });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        response.status(400).send({ errorCode, errorMessage });
    });
});

const getUserInfo = functions.https.onRequest((request, response) => {
    firebaseAuth.onAuthStateChanged(auth, (user) => {
        if (user) {
            response.status(200).send({ user: user });
        } else {
            response.status(400).send
        }
      });
});

const signoutUser = functions.https.onRequest((request, response) => {
    firebaseAuth.signOut(auth)
    .then((user) => {
        response.status(200).send({ message: "Successfully signed out" })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        response.status(400).send({ errorCode, errorMessage });
    });
})

export default {
    createEmailUser,
    signInEmailUser,
    getUserInfo,
    signoutUser
};