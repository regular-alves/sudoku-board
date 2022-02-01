import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Toogle(props) {
  const {
    onChange, text, checked, id,
  } = props;

  return (
    <div className="toogle-button">
      <span>{text}</span>
      <label htmlFor={id}>
        <input type="checkbox" id={id} value="1" onChange={onChange} checked={!!checked} />
        <span>&nbsp;</span>
      </label>
    </div>
  );
}

Toogle.defaultProps = {
  onChange: () => {},
  text: '',
  id: '',
  checked: false,
};

Toogle.propTypes = {
  onChange: propTypes.func,
  text: propTypes.string,
  checked: propTypes.bool,
  id: propTypes.string,
};

export default Toogle;
