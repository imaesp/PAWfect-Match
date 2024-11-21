// import Hero from "./pages/Hero/Hero.jsx";
// //import Survey from './pages/Survey/Survey.jsx'
import Navbar from "./components/Navbar/Navbar.jsx";
// import SurveyPage from "./pages/SurveyPage/SurveyPage.jsx";
// import TestPage from "./pages/TestPage/TestPage.jsx";
// import { Routes, Route } from "react-router-dom";
import BudgetPage from "./pages/BudgetPage/BudgetPage.jsx";
import "./App.scss";

function App() {
  return (
    <>
      <Navbar></Navbar>
      {/* <Routes>
        <Route path='/' element={<Hero></Hero>}>
        </Route>
        <Route path='/survey' element={<SurveyPage></SurveyPage>}>
        </Route>
        <Route path='/test' element={<TestPage></TestPage>}>
        </Route>
      </Routes> */}
      <BudgetPage></BudgetPage>
    </>
  );
}

export default App;
