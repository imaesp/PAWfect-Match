import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BudgetsProvider } from "./components/BudgetComponents/BudgetsContext.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const PUBLISHABLE_KEY = import.meta.env.VITE_CL_API_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BudgetsProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools></ReactQueryDevtools>
          </QueryClientProvider>
        </BudgetsProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);