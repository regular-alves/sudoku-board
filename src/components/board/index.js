import React, { useEffect, useState } from 'react';
import './style.css';
import Row from '../row';

const Board = ({length}) => {
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

    const setField = (y,x,value) => {
        let newFields = fields.slice();
        
        if(newFields[y][x]!==undefined) {
            newFields[y][x] = value
        }

        setFields(newFields);
    }

    useEffect(() => {
        console.table(fields);
    }, [fields]);

    return (
        <div className="sudoku-board">
            {fields.map((columns, key) => (
                <Row 
                    columns={columns} 
                    row={key} 
                    boardLength={length}
                    changeHandler={setField}
                />
            ))}
        </div>
    );
}

export default Board;