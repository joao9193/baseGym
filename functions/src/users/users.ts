import * as functions from "firebase-functions";
import * as firebaseAuth from "firebase/auth";
import { app } from "../index";

const auth = firebaseAuth.getAuth(app);

const createEmailUser = functions.https.onRequest((request, response) => {
    // functions.logger.info("Hello logs!", {structuredData: true});
    const { email, password } = request.body;
    firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            response.status(200).send({
                message: "Successfully created email user",
                user: userCredential.user
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            response.status(400).send({ errorCode, errorMessage });
        });
});

const signInEmailUser = functions.https.onRequest((request, response) => {
    const { email, password } = request.body;
    firebaseAuth.signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            response.status(200).send({
                message: "Successfully signed in",
                user: userCredential.user
            });
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
            response.status(400).send({ message: "No user signed in" });
        }
    });
});

const signoutUser = functions.https.onRequest((request, response) => {
    firebaseAuth.signOut(auth)
        .then(() => {
            response.status(200).send({ message: "Successfully signed out" });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            response.status(400).send({ errorCode, errorMessage });
        });
});

export default {
    createEmailUser,
    signInEmailUser,
    getUserInfo,
    signoutUser
};
