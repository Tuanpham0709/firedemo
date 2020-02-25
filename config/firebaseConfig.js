import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDIME_neks0jEiuq0A9QxZE2aICgnN2Fj8",
    authDomain: "fir-demo-3166b.firebaseapp.com",
    databaseURL: "https://fir-demo-3166b.firebaseio.com",
    projectId: "fir-demo-3166b",
    storageBucket: "fir-demo-3166b.appspot.com",
    messagingSenderId: "576019112612",
    appId: "1:576019112612:web:63b70220d74d7bd55dfc31",
    measurementId: "G-94SLHCTFBB"
    // Initialize Firebase

}
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todoRef = databaseRef.child("todos");
