import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Column extends React.Component {
  constructor(props) {
    super(props);

    const {
      column, boardLength, error, row, value, changeHandler, possible,
    } = props;

    this.column = column;
    this.error = error;
    this.row = row;
    this.value = value;
    this.changeHandler = changeHandler;
    this.possible = possible;

    this.sectionLength = Math.sqrt(boardLength);
    this.lastOfSection = (column + 1) % this.sectionLength === 0;
  }

  render() {
    return (
      <div
        className={
                    `column column-${this.column} `
                    + `section-${Math.floor((this.column + this.sectionLength) / this.sectionLength)} `
                    + `${this.lastOfSection ? 'section-last' : ''} `
                    + `${this.error ? 'error' : ''}`
                }
      >
        <input
          id={`input-${this.row}-${this.column}`}
          type="number"
          className="field"
          value={this.value}
          onChange={(e) => {
            this.changeHandler(this.column, e.target.value.substr(-1));
          }}
        />
        <div className="possibles">
          {
            this.possible
            && this.possible.length > 0
            && this.possible.map((i) => (
              <label
                htmlFor={`input-${this.row}-${this.column}`}
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
}

Column.defaultProps = {
  error: false,
  value: null,
  changeHandler: () => {},
  possible: [],
};

Column.propTypes = {
  column: PropTypes.number.isRequired,
  boardLength: PropTypes.number.isRequired,
  error: PropTypes.bool,
  row: PropTypes.number.isRequired,
  value: PropTypes.number,
  changeHandler: PropTypes.func,
  possible: PropTypes.arrayOf(PropTypes.number),
};

export default Column;
