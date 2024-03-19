import './App.css'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithPopup, signOut} from "firebase/auth";
import { provider, auth} from "./firebase";
import SignOut from "./SignOut";

function SignIn() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    const handleGoogleSignIn=()=>{
      signInWithPopup(auth, provider).then((result)=>{
        const user = result.user;
        console.log(user);
        setUser(user);
        navigate('/home');
      }).catch((err)=>{
        console.log(err);
      })
    }

    useEffect(() => {
      // checks if user is signed in
      const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
              setUser(user);
              navigate('/home');
          }
      });
      return () => unsubscribe();
    }, [navigate]);

    const handleSignOut = () => {
      signOut(auth)
          .then(() => {
              setUser(null);
              navigate('/');
          })
          .catch((error) => {
              console.log(error);
          });
  };

    //return button
    return (
      <div className="mainContainer">
      <div className="topRight">
          {user && (
              <button className="logout-button" onClick={handleSignOut}>Logout</button>
          )}
      </div>
      <div className={'titleContainer'}>
          <div>Welcome!</div>
      </div>
      <div>Simplifying college cooking, one ingredient at a time. </div>
      <div className={'buttonContainer'}>
          {!user && (
              <button className="google-button" onClick={handleGoogleSignIn}>Sign in with Google</button>
          )}
      </div>
  </div>
);
}
  export default SignIn;