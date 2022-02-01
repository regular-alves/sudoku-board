import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.css';

function Timer(props) {
  const { started, state, setState } = props;
  const [took, setTook] = useState(state === null || Number.isNaN(state) ? 0 : parseInt(state, 10));
  const [startDate, setStartDate] = useState(0);

  if (started && !startDate) {
    const time = new Date();

    time.setTime(time.getTime() + (-1 * took));

    setStartDate(new Date(time));
  }

  if (started && startDate) {
    setInterval(
      () => {
        setTook(new Date().getTime() - startDate.getTime());
        setState(new Date().getTime() - startDate.getTime());
      },
      1000,
    );
  }

  return (
    <div className="timer">
      {new Date(took).toISOString().substr(11, 8)}
    </div>
  );
}

Timer.defaultProps = {
  started: false,
  state: 0,
  setState: () => {},
};

Timer.propTypes = {
  started: PropTypes.bool,
  state: PropTypes.number,
  setState: PropTypes.func,
};

export default Timer;
