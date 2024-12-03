import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';
import './AuthGuard.scss'; 

const AuthGuard = ({ children }) => {
  const { userId } = useAuth();
  const location = useLocation(); // Get the current location
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    // If the user is not authenticated, show the modal
    if (!userId) {
      setShowSignInModal(true);
    } else {
      setShowSignInModal(false);
    }
  }, [userId]);

  if (!userId) {
    return (
      <div className="auth-guard-container">
        <SignIn
          mode="modal"
          fallbackRedirectUrl={location.pathname} // Use the current URL as the fallback
        />
      </div>
    );
  }

  // If user is authenticated, render the child components
  return <>{children}</>;
};

export default AuthGuard;
