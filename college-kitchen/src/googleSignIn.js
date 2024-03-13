import './App.css'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth} from "./firebase";


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
  
    const handleLogout=()=>{
      setUser(null);
    }

    //return button
    return (
    <div className="mainContainer">
        <div className={'titleContainer'}>
          <div>Welcome!</div>
        </div>
          <div>Simplifying college cooking, one ingredient at a time. </div>
      <div className={'buttonContainer'}>
        <button className="google-button" onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
    </div>
  
    );


}
  export default SignIn;