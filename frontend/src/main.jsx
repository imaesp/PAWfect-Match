import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx'
<<<<<<< Updated upstream
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'



const PUBLISHABLE_KEY = import.meta.env.VITE_CL_API_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
=======
 //import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'



const PUBLISHABLE_KEY = import.meta.env.VITE_CL_API_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
>>>>>>> Stashed changes
)
