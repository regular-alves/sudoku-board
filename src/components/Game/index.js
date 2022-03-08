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
              recommended: true,
            }, {
              value: 2,
              recommended: true,
            }, {
              value: 3,
              recommended: true,
            }, {
              value: 4,
              recommended: true,
            }, {
              value: 5,
              recommended: true,
            }, {
              value: 6,
              recommended: true,
            }, {
              value: 7,
              recommended: true,
            }, {
              value: 8,
              recommended: true,
            }, {
              value: 9,
              recommended: true,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Game;
