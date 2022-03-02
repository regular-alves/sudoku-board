import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Column(props) {
  const {
    column,
    boardLength,
    error,
    row,
    value,
    changeHandler,
    possible,
    appendRef,
    keyUpHandler: keyUp,
    keyDownHandler: keyDown,
  } = props;

  const sectionLength = Math.sqrt(boardLength);
  const classNames = [
    'field',
    `column-${column}`,
    `section-${Math.floor((column + sectionLength) / sectionLength)}`,
  ];

  if ((column + 1) % sectionLength === 0 && boardLength !== (column + 1)) {
    classNames.push('border-right');
  }

  if ((row + 1) % sectionLength === 0 && boardLength !== (row + 1)) {
    classNames.push('border-bottom');
  }

  if (error) {
    classNames.push('error');
  }

  const ref = useRef(null);

  appendRef(ref, `${row}:${column}`);

  return (
    <div
      key={`field-${row}-${column}`}
      className={classNames.join(' ')}
    >
      <input
        key={`input-${row}-${column}`}
        data-col={column}
        data-row={row}
        type="number"
        ref={ref}
        value={value}
        onKeyDown={keyDown}
        onKeyUp={keyUp}
        onChange={(e) => {
          changeHandler(row, column, e.target.value.substr(-1));
        }}
      />
      <div className="possibles">
        {
          possible
          && possible.length > 0
          && possible.map((i) => (
            <label
              htmlFor={`input-${row}-${column}`}
              className="possible"
            >
              {i}
            </label>
          ))
        }
      </div>
    </div>
  );
}

Column.defaultProps = {
  error: false,
  value: null,
  changeHandler: () => {},
  appendRef: () => {},
  keyUpHandler: () => {},
  keyDownHandler: () => {},
  possible: [],
};

Column.propTypes = {
  column: PropTypes.number.isRequired,
  boardLength: PropTypes.number.isRequired,
  error: PropTypes.bool,
  row: PropTypes.number.isRequired,
  value: PropTypes.number,
  changeHandler: PropTypes.func,
  appendRef: PropTypes.func,
  keyUpHandler: PropTypes.func,
  keyDownHandler: PropTypes.func,
  possible: PropTypes.arrayOf(PropTypes.number),
};

export default Column;
