import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB69Np-K-toJHI2hYJAHQFhEFFvICFiYLI",
    authDomain: "okhtoapp.firebaseapp.com",
    projectId: "okhtoapp",
    storageBucket: "okhtoapp.appspot.com",
    messagingSenderId: "317798037204",
    appId: "1:317798037204:web:cdccc81b36eb4bf40c6d41",
    measurementId: "G-MTHZRVBZHH"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };