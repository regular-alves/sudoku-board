import react from 'react';
import './style.css';

const Toogle = ({onChange, text}) => {
    return (
        <div className="toogle-button">
            <span>{text}</span>
            <label>
                <input type="checkbox" value="1" onChange={onChange} />
                <span>&nbsp;</span>
            </label>
        </div>
    )
};

export default Toogle;