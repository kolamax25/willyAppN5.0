import firebase from 'firebase'
require('@firebase/firestore')



const firebaseConfig = {
    apiKey: "AIzaSyBqyya_38jSBDvglw0mubjrwf4A6zeFUUQ",
    authDomain: "willyapp-e4119.firebaseapp.com",
    databaseURL: "https://willyapp-e4119.firebaseio.com",
    projectId: "willyapp-e4119",
    storageBucket: "willyapp-e4119.appspot.com",
    messagingSenderId: "1035268589415",
    appId: "1:1035268589415:web:5ffeba03dfff3bfc0751c2"
  };
  
 firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();