import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

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
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);