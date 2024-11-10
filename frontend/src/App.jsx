import Hero from './pages/Hero/Hero.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import SurveyPage from './pages/SurveyPage/SurveyPage.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.scss'
 

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Hero></Hero>}>
        </Route>
        <Route path='/survey' element={<SurveyPage></SurveyPage>}>
        </Route>
      </Routes>
    </div>
  )   
}

export default App
