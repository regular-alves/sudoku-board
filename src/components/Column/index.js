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
    this.row = row;
    this.value = value;
    this.changeHandler = changeHandler;
    this.possible = possible;

    this.sectionLength = Math.sqrt(boardLength);
    this.classNames = [
      'column',
      `column-${this.column}`,
      `section-${Math.floor((this.column + this.sectionLength) / this.sectionLength)}`,
    ];

    if ((column + 1) % this.sectionLength === 0 && boardLength !== (column + 1)) {
      this.classNames.push('border-right');
    }

    if ((row + 1) % this.sectionLength === 0 && boardLength !== (row + 1)) {
      this.classNames.push('border-bottom');
    }

    if (error) {
      this.classNames.push('error');
    }
  }

  render() {
    return (
      <div
        key={`wrapper-${this.row}-${this.column}`}
        className={this.classNames.join(' ')}
      >
        <input
          key={`input-${this.row}-${this.column}`}
          type="number"
          className="field"
          value={this.value}
          onChange={(e) => {
            this.changeHandler(this.row, this.column, e.target.value.substr(-1));
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
