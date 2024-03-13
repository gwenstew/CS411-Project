import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth} from "./firebase";


function SignIn() {
 
    const navigate = useNavigate(); // Initialize useNavigate hook
  
    const handleSignIn = () => {
      signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          console.log("User signed in:", user);
          // Redirect the user to the home route
          navigate('/home'); // Redirect to the home route after successful sign-in
        })
        .catch((error) => {
          console.error("Error signing in:", error);
        });
    };
  
    return (
      <button onClick={handleSignIn}>Sign in with Google</button>
    );
  }
  
  export default SignIn;