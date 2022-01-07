import {useState, useEffect} from 'react';

import './style.css';

const Timer = ({ started }) => {
    const [took, setTook] = useState(0);
    const [startDate, setStartDate] = useState(null);


    useEffect(() => {}, [took]);

    if(started && !startDate) {
        setStartDate(new Date());
    }

    if(started && startDate) {
        setInterval(
            () => setTook(new Date().getTime() - startDate.getTime()),
            1000
        );
    }

    return (
        <div className="timer">
            {new Date(took).toISOString().substr(11, 8)}
        </div>
    );
}

export default Timer;