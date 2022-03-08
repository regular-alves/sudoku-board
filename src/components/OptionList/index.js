import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function OptionList(props) {
  const { values, onSelect } = props;

  return (
    <ul className="options">
      {values.map((value) => <li className="option"><button type="button" onClick={onSelect(value.value)}>{value.value}</button></li>)}
    </ul>
  );
}

OptionList.defaultProps = {
  values: [],
  onSelect: () => {},
};

OptionList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

export default OptionList;
