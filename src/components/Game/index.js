import React from 'react';
import Board from '../Board';
import OptionList from '../OptionList';
import Timer from '../Timer';
import './style.css';

function Game() {
  return (
    <div className="content">
      <div className="game">
        <Timer>14:48</Timer>
        <Board length={9} />
        <OptionList
          values={[
            {
              value: 1,
              recommended: false,
            }, {
              value: 2,
              recommended: false,
            }, {
              value: 3,
              recommended: false,
            }, {
              value: 4,
              recommended: false,
            }, {
              value: 5,
              recommended: false,
            }, {
              value: 6,
              recommended: false,
            }, {
              value: 7,
              recommended: false,
            }, {
              value: 8,
              recommended: false,
            }, {
              value: 9,
              recommended: false,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Game;
