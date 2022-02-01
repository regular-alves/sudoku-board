import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Toogle from '../Toogle';
import Timer from '../Timer';
import Column from '../Column';

import './style.css';

function Board({ length }) {
  const storageFields = JSON.parse(localStorage.getItem('sudoku-board-fields'));
  const defaultObject = {
    value: null,
    error: false,
    possible: Array.from(Array(length).keys()),
  };

  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('sudoku-board-dark-theme') === '1');
  const [tips, setTips] = useState(localStorage.getItem('sudoku-board-show-tips') === '1');
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

  checkBoard(fields);

  return (
    <div className={`wrapper ${darkTheme ? 'dark' : ''} ${tips ? 'show-tips' : ''}`}>
      <div className="sudoku-board">
        {fields.map((row, rowKey) => (row.map((col, colKey) => (
          <Column
            key={`item-${rowKey + 1}-${colKey + 1}`}
            error={col.error}
            value={col.value}
            column={colKey}
            row={rowKey}
            boardLength={length}
            changeHandler={setField}
            possible={col.possible || []}
          />
        ))))}
      </div>
      <div className="side-bar">
        <div className="settings">
          <Toogle
            text="Dark theme"
            id="dark-theme"
            checked={darkTheme}
            onChange={(e) => {
              localStorage.setItem(
                'sudoku-board-dark-theme',
                e.target.checked ? 1 : 0,
              );

              setDarkTheme(e.target.checked ? 1 : 0);
            }}
          />
          <Toogle
            text="Show tips"
            id="show-tips"
            checked={tips}
            onChange={(e) => {
              localStorage.setItem(
                'sudoku-board-show-tips',
                e.target.checked ? 1 : 0,
              );

              setTips(e.target.checked ? 1 : 0);
            }}
          />
        </div>
        <Timer
          started={started}
          state={Number.parseInt(localStorage.getItem('sudoku-board-time'), 10)}
          setState={(took) => {
            localStorage.setItem('sudoku-board-time', took);
          }}
        />
        <ul className="history" />
      </div>
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
