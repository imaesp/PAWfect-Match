import React, {useEffect, useState} from 'react'
import axios from 'axios'
import JComponents from "../../components/JComponents/JComponents";

function TestPage() {
    const [survey, setSurvey] = useState([])

    useEffect(() => {
      const fetchItems = () => {
        let localStorageEmail = localStorage.getItem('userEmail')
        axios.get(`http://localhost:5001/${localStorageEmail}/survey`)
        .then(res => {
          console.log(res)
          setSurvey(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }
      fetchItems();
    }, [])
  
    return (
        <div>
            <h1>Survey Page</h1>
            <div className='results'>
                <h1>Results</h1>
                {survey.map((individualSurvey, index) => {
                return(
                    <ul key={index}>
                    <li>{JSON.stringify(individualSurvey)}</li>
                    </ul>
                )
                })}
            </div>
        </div>
    )
}

export default TestPage