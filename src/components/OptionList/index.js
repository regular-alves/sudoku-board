import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function OptionList(props) {
  const { values } = props;

  return (
    <ul className="options">
      {values.map((value) => <li className="option"><button type="button">{value.value}</button></li>)}
    </ul>
  );
}

OptionList.defaultProps = {
  values: [],
};

OptionList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
};

export default OptionList;
