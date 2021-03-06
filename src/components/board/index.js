import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Column from '../Column';

import './style.css';

function Board({ length }) {
  const storageFields = JSON.parse(localStorage.getItem('sudoku-board-fields'));
  const defaultObject = {
    value: null,
    error: false,
    possible: Array.from(Array(length).keys()),
  };

  const [started, setStarted] = useState(false);
  const [fields, setFields] = useState(
    storageFields && storageFields.length > 0
      ? storageFields.map((row) => row.map((col) => {
        const field = JSON.parse(JSON.stringify(defaultObject));
        return {
          ...field,
          value: col,
        };
      }))
      : JSON.parse(JSON.stringify(Array(9).fill(Array(9).fill(defaultObject)))),
  );

  const appendTo = (ref, index) => {
    if (!ref) return;

    window.references = { ...(window.references || {}), [index]: ref };
  };

  const duplicated = (val, i, self) => self.indexOf(val) !== i;
  const unique = (val, i, self) => self.indexOf(val) === i;

  useEffect(() => {
    localStorage.setItem(
      'sudoku-board-fields',
      JSON.stringify(fields.map((row) => row.map((col) => col?.value ?? null))),
    );
  }, [fields]);

  const getRow = (y) => {
    const resultSet = fields[y] || [];

    return resultSet.filter((item) => !!item.value).map((field) => parseInt(field.value, 10));
  };

  const getColumn = (x) => {
    const resultSet = [];

    fields.slice().map((row) => resultSet.push(row[x] || null));

    return resultSet.filter((item) => !!item.value).map((field) => parseInt(field.value, 10));
  };

  const getSection = (y, x) => {
    const resultSet = [];
    const section = Math.sqrt(length);

    const startY = Math.floor(y / section) * section;
    const startX = Math.floor(x / section) * section;

    fields
      .slice(startY, startY + section)
      .map((row) => resultSet.push(...row.slice(startX, startX + section)));

    return resultSet.filter((item) => !!item.value).map((field) => parseInt(field.value, 10));
  };

  const checkBoard = (boardFields) => boardFields
    .map((row, y) => row.map((col, x) => {
      const newCol = col;

      if (newCol.value) {
        newCol.error = !!(
          getRow(y).filter(duplicated).includes(col.value)
                            || getColumn(x).filter(duplicated).includes(col.value)
                            || getSection(y, x).filter(duplicated).includes(col.value)
        );
      } else {
        newCol.error = false;
      }

      const values = [];

      values.push(...getRow(y));
      values.push(...getColumn(x));
      values.push(...getSection(y, x));

      const uniqueValues = values.filter(unique);
      newCol.possible = [...Array(length).keys()]
        .map((x1) => x1 + 1)
        .filter((x2) => !uniqueValues.includes(x2));

      return newCol;
    }));

  const setField = (y, x, v) => {
    if (!started && !!v) {
      setStarted(true);
    }

    let newFields = fields.slice();

    if (newFields[y][x] !== undefined) {
      newFields[y][x].value = parseInt(v, 10);

      newFields = checkBoard(newFields);
    }

    setFields(newFields);
  };

  const handleCellMoving = (col, row, keyCode) => {
    let nextCol = col;
    let nextRow = row;

    if (keyCode === 37) {
      nextCol = col - 1;
    }

    if (keyCode === 38) {
      nextRow = row - 1;
    }

    if (keyCode === 39) {
      nextCol = col + 1;
    }

    if (keyCode === 40) {
      nextRow = row + 1;
    }

    if ([9, 13].includes(keyCode)) {
      nextCol = col + 1;
    }

    if (nextCol >= length) {
      nextCol = 0;
      nextRow += 1;
    }

    if (nextRow >= length) {
      nextRow = 0;
    }

    if (window.references[`${nextRow}:${nextCol}`] !== undefined) {
      window.references[`${nextRow}:${nextCol}`].current.focus();
    }
  };

  const keyUpEvent = (e) => {
    e.preventDefault();

    handleCellMoving(
      Number.parseInt(e.target.getAttribute('data-col'), 10),
      Number.parseInt(e.target.getAttribute('data-row'), 10),
      [9, 13, 37, 38, 39, 40].includes(e.which) ? e.which : 39,
    );

    return false;
  };

  const keyDownEvent = (e) => {
    if ([9, 13, 37, 38, 39, 40].includes(e.which)) {
      e.preventDefault();
      return false;
    }

    return e;
  };

  checkBoard(fields);

  return (
    <div className="board">
      {fields.map((row, rowKey) => (row.map((col, colKey) => (
        <Column
          key={`item-${rowKey + 1}-${colKey + 1}`}
          error={col.error}
          value={col.value}
          column={colKey}
          row={rowKey}
          boardLength={length}
          changeHandler={setField}
          appendRef={appendTo}
          keyUpHandler={keyUpEvent}
          keyDownHandler={keyDownEvent}
          possible={col.possible || []}
        />
      ))))}
    </div>
  );
}

Board.defaultProps = {
  length: 9,
};

Board.propTypes = {
  length: PropTypes.number,
};

export default Board;
