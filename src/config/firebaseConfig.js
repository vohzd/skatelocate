import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDfVm8CBtqso1tVENwV3DFdaswxon8oajM",
  authDomain: "skatelocate-de33c.firebaseapp.com",
  databaseURL: "https://skatelocate-de33c.firebaseio.com",
  projectId: "skatelocate-de33c",
  storageBucket: "skatelocate-de33c.appspot.com",
  messagingSenderId: "463067538174"
}

export default firebase.initializeApp(config);
