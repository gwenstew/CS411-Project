import { get } from 'express/lib/request';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth , signInWithGooglePopup} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyArNaWNiI7dlCQZi1b9lIEQa4pDsroW6KE",
    authDomain: "college-kitchen-bu.firebaseapp.com",
    databaseURL: "https://college-kitchen-bu-default-rtdb.firebaseio.com",
    projectId: "college-kitchen-bu",
    storageBucket: "college-kitchen-bu.appspot.com",
    messagingSenderId: "646410487427",
    appId: "1:646410487427:web:9381fd24abc60bc7893db6",
    measurementId: "G-KRB5DSBN00"
  };
  
  // initialize firebase
  const app = initializeApp(firebaseConfig);
  // initialize firebase authentication

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth(app);
  export const signInWithGooglePopup = () => signInWithGooglePopup(auth, provider);