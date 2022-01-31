import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Column from '../Column';

function Row(props) {
  const {
    columns, row, changeHandler, boardLength,
  } = props;
  const sectionLength = Math.sqrt(boardLength);
  const lastOfSection = (row + 1) % sectionLength === 0;

  const changeFieldHandler = (x, value) => {
    changeHandler(row, x, value);
  };

  return (
    <div className={`row row-${row} ${lastOfSection ? 'row-section-last' : ''}`}>
      {columns.map((col, key) => (
        <Column
          error={col?.error}
          value={col?.value}
          column={key}
          row={row}
          boardLength={boardLength}
          changeHandler={changeFieldHandler}
          possible={col?.possible || []}
        />
      ))}
    </div>
  );
}

Row.defaultProps = {
  changeHandler: () => {},
  columns: [],
};

Row.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  row: PropTypes.number.isRequired,
  changeHandler: PropTypes.func,
  boardLength: PropTypes.number.isRequired,
};

export default Row;
