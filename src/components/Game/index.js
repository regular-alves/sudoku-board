import React from 'react';
import Board from '../Board';
import './style.css';

function Game() {
  return (
    <div className="content">
      <div className="game">
        <div className="timer">14:48</div>
        <Board length={9} />
      </div>
    </div>
  );
}

export default Game;
