import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(config);
firebase.analytics();

export default firebase;

export const Auth = firebase.auth();
export const LOCAL = firebase.auth.Auth.Persistence.LOCAL;
export const SESSION = firebase.auth.Auth.Persistence.SESSION;

export const Firestore = firebase.firestore();
export const FieldValue = firebase.firestore.FieldValue;

if (window.location.hostname === "localhost") {
  Firestore.settings({
    host: "localhost:5000",
    ssl: false
  });
}