import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';

const AuthGuard = ({ children }) => {
  const { userId } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  console.log('AuthGuard rendered, userId:', userId);
  console.log('SignIn modal rendering for unauthenticated users');


  useEffect(() => {
    // If the user is not authenticated, show the modal
    if (!userId) {
      setShowSignInModal(true);
    } else {
      setShowSignInModal(false);
    }
  }, [userId]); // Runs whenever the authentication status changes

  if (!userId) {
    return (
      <div className="sign-in-modal">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          fallbackRedirectUrl={window.location.pathname} // Redirect to the current page
        />
      </div>
    );
  }
  
  // If user is authenticated, render the child components
  return <>{children}</>;
};

export default AuthGuard;
