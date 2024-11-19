import Hero from './pages/Hero/Hero.jsx'
<<<<<<< Updated upstream
import Navbar from './components/Navbar/Navbar.jsx'
import SurveyPage from './pages/SurveyPage/SurveyPage.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.scss'
 
=======
<<<<<<< Updated upstream
//import Survey from './pages/Survey/Survey.jsx'
=======
import Navbar from './components/Navbar/Navbar.jsx'
import SurveyPage from './pages/SurveyPage/SurveyPage.jsx'
import TestPage from './pages/TestPage/TestPage.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.scss'
 
>>>>>>> Stashed changes
>>>>>>> Stashed changes

function App() {

  return (
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
    <Hero>
    </Hero>
=======
>>>>>>> Stashed changes
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Hero></Hero>}>
        </Route>
        <Route path='/survey' element={<SurveyPage></SurveyPage>}>
        </Route>
<<<<<<< Updated upstream
      </Routes>
    </div>
=======
        <Route path='/test' element={<TestPage></TestPage>}>
        </Route>
      </Routes>
    </div>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  )   
}

export default App
