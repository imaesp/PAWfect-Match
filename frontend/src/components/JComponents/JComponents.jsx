import { motion } from "framer-motion";
import './JComponents.scss'

function JComponents() {
    return (
        <div className="jc-container">
            <div className="button-container">
                <div className="first">
                    <button className="first-button">1</button>
                    <p>Take the quiz</p>
                </div>
                <div className="second">
                    <button className="second-button">2</button>
                    <p>Adopt your pet</p>
                </div>
                <div className="third">
                    <button className="third-button">3</button>
                    <p>PAWfect Match found!</p>
                </div>
            </div>
            <div>
                <button className="survey-button">Take Survey!</button>
            </div>
        </div>
    )
}

export default JComponents