import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from "react";
import "./Login.scss";

function Login() {
  return (
    <div className="login-container">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="sign-in-button">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Login;
