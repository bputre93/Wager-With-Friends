import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyBVshvvBPoMlENhj8ZUTkDq2ptljHprPp8",
  authDomain: "wage-with-friends.firebaseapp.com",
  databaseURL: "https://wage-with-friends.firebaseio.com",
  storageBucket: "wage-with-friends.appspot.com",
  messagingSenderId: "24051939106"
};
var fire = firebase.initializeApp(config);
export default fire;