import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from 'react'
import './Login.scss'

function Login() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default Login