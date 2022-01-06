 var firebaseConfig = {
    apiKey: "AIzaSyAyEtukipXH4EzR-DMaaX37AKrINs9kZ8I",
    authDomain: "fyp1-fca46.firebaseapp.com",
    databaseURL: "https://fyp1-fca46.firebaseio.com",
    projectId: "fyp1-fca46",
    storageBucket: "fyp1-fca46.appspot.com",
    messagingSenderId: "644949984251",
    appId: "1:644949984251:web:57a77121158da31a15c15e",
    measurementId: "G-DVR4MHH1TJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db  = firebase.database();
  