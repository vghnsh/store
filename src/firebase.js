import firebase from 'firebase';

var firebaseApp = firebase.initializeApp(
    {
      apiKey: "AIzaSyBr-jPP8e3Jy-ktITvOyvI6Q18lK3Gb4nE",
      authDomain: "store-8644c.firebaseapp.com",
      projectId: "store-8644c",
      storageBucket: "store-8644c.appspot.com",
      messagingSenderId: "1005074285795",
      appId: "1:1005074285795:web:99f17e0409b3fce87d71d6"
      
  });


const auth= firebase.auth();
const db= firebaseApp.firestore();

export  {auth,db};