import { get } from 'express/lib/request';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth , signInWithGooglePopup} from "firebase/auth";

const firebaseConfig = {
<<<<<<< HEAD
    apiKey: "AIzaSyArNaWNiI7dlCQZi1b9lIEQa4pDsroW6KE",
    authDomain: "college-kitchen-bu.firebaseapp.com",
    databaseURL: "https://college-kitchen-bu-default-rtdb.firebaseio.com",
    projectId: "college-kitchen-bu",
    storageBucket: "college-kitchen-bu.appspot.com",
    messagingSenderId: "646410487427",
    appId: "1:646410487427:web:9381fd24abc60bc7893db6",
    measurementId: "G-KRB5DSBN00"
=======
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
>>>>>>> 6da2052fe17d4a98b6916ccc5cee485fb9445f7a
  };
  
  // initialize firebase
  const app = initializeApp(firebaseConfig);
  // initialize firebase authentication

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const auth = getAuth(app);
  export { auth, provider};