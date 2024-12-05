import Hero from './pages/Hero/Hero.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import SurveyPage from './pages/SurveyPage/SurveyPage.jsx';
import TestPage from './pages/TestPage/TestPage.jsx';
import BudgetPage from './pages/BudgetPage/BudgetPage.jsx';
import AdoptPage from './pages/AdoptPage/Adopt.jsx';
import ArticlePage from './pages/ArticlePage/ArticlePage.jsx';
import AuthGuard from './components/AuthGuard/AuthGuard.jsx'; // Import the AuthGuard component
import ChecklistPage from './pages/ChecklistPage/Checklist.jsx'
import { Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignedIn } from '@clerk/clerk-react'
import './App.scss';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/survey" element={<AuthGuard><SurveyPage /></AuthGuard>}/>
        <Route path="/test" element={<TestPage />} />
        <Route path="/budget" element={<AuthGuard><BudgetPage /></AuthGuard>}/>
        <Route path="/adopt" element={<AdoptPage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/ready" element={<ChecklistPage/>}/>
      </Routes>
    </>
  );
}

export default App;
