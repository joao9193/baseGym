import * as functions from "firebase-functions";
import * as firebaseAuth from "firebase/auth";
import { app } from "../index";
import * as messages from './messages.json';

const auth = firebaseAuth.getAuth(app);

exports.createEmailUser = functions.https.onRequest((request, response) => {
    // functions.logger.info("Hello logs!", {structuredData: true});
    const { email, password } = request.body;
    firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            response.status(200).send({
                message: messages.EMAIL_USER_CREATE_SUCCESS,
                user: userCredential.user
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            response.status(400).send({ errorCode, errorMessage });
        });
});

exports.signInEmailUser = functions.https.onRequest((request, response) => {
    const { email, password } = request.body;
    firebaseAuth.signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            response.status(200).send({
                message: messages.SIGNIN_SUCCESS,
                user: userCredential.user
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            response.status(400).send({ errorCode, errorMessage });
        });
});

exports.getUserInfo = functions.https.onRequest((request, response) => { // TODO: Currently broken
    firebaseAuth.onAuthStateChanged(auth, (user) => {
        if (user) {
            response.status(200).send({ user: user });
        } else {
            response.status(400).send({ message: messages.NO_USER_SIGNED_IN });
        }
    });
});

exports.signoutUser = functions.https.onRequest((request, response) => {
    firebaseAuth.signOut(auth)
        .then(() => {
            response.status(200).send({ message: messages.SIGNOUT_SUCCESS });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            response.status(400).send({ errorCode, errorMessage });
        });
});
