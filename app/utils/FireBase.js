import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTUOPPWv2N0bx3w9EFX1Z27NBWiUMBa-w",
  authDomain: "tenedores-29655.firebaseapp.com",
  databaseURL: "https://tenedores-29655.firebaseio.com",
  projectId: "tenedores-29655",
  storageBucket: "tenedores-29655.appspot.com",
  messagingSenderId: "529854739315",
  appId: "1:529854739315:web:c4a3efec81a56328394b06"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
