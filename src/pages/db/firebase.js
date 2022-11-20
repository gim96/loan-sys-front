import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBb1w0BlRsxUY90GrbjpBdR8JvsKSqpmcM",
    authDomain: "sanjaya-tailors.firebaseapp.com",
    projectId: "sanjaya-tailors",
    storageBucket: "sanjaya-tailors.appspot.com",
    messagingSenderId: "135377115832",
    appId: "1:135377115832:web:00249f8be9a1a7e146724d"
};
// Initialize Firebase

firebase.initializeApp(config);

export default firebase;