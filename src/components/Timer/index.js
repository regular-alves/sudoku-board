import {useState} from 'react';

import './style.css';

const Timer = ({ started, state = 0, setState }) => {
    const [took, setTook] = useState(state===null || isNaN(state) ? 0 : parseInt(state));
    const [startDate, setStartDate] = useState(0);

    if(started && !startDate) {
        const time = new Date();

        time.setTime(time.getTime() + (-1 * took));

        setStartDate(new Date(time));
    }

    if(started && startDate) {
        setInterval(
            () => {
                setTook(new Date().getTime() - startDate.getTime());
                setState(new Date().getTime() - startDate.getTime());
            },
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