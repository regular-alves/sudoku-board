import React, { useState } from 'react';
import './style.css';
import Row from '../row';

const Board = length => {
    const [fields, setFields] = useState([
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ]);

    return (
        <div className="sudoku-board">
            {fields.map((columns, key) => (<Row columns={columns} row={key} />))}
        </div>
    );
}

export default Board;