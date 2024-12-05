import './Checkbox.scss';
import { useState } from 'react';

function Checkbox({id, section, value}) {
    const [check, setCheck] = useState(false);

    // Function to toggle the checkbox state
    const toggleCheck = () => {
        setCheck((prevCheck) => !prevCheck); // Toggle the state
    };

    return (
        <>
            <input
                type="checkbox"
                id={id}
                name={section}
                value={value}
                checked={check} // Bind the checkbox to the `check` state
                onChange={toggleCheck} // Trigger `toggleCheck` on change
            />
            <label htmlFor={id}>{value}</label> 
        </>
    );
}

export default Checkbox;
