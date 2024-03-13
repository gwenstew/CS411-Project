import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth} from "./firebase";


function SignIn() {
  
    const [user, setUser] = useState(null);

    const handleGoogleSignIn=()=>{
      signInWithPopup(auth, provider).then((result)=>{
        const user = result.user;
        console.log(user);
        setUser(user);
      }).catch((err)=>{
        console.log(err);
      })
    }
  
    const handleLogout=()=>{
      setUser(null);
    }

    //return button
    return (
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    );


}
  export default SignIn;