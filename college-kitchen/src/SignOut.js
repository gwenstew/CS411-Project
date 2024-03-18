import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function SignOut({ onSignOut }) {
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Call the parent component's signOut function
            onSignOut();
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <button className="sign-out-button" onClick={handleSignOut}>Sign out</button>
    );
}

export default SignOut;