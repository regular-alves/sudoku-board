import React, { useState } from 'react';
import './style.css';
import Row from '../row';

const Board = ({ length }) => {
    const defaultObject = {
        value: null, 
        error: false,
        possible: Array.from(Array(length).keys())
    };

    const [fields, setFields] = useState(
        JSON.parse(JSON.stringify(Array(9).fill(Array(9).fill(defaultObject))))
    );
        
    const duplicated = (val, i, self) => self.indexOf(val) !== i;
    const unique = (val, i, self) => self.indexOf(val) === i;

    const setField = (y,x,v) => {
        let newFields = fields.slice();
        
        if(newFields[y][x]!==undefined) {
            console.log({ x, y, field: newFields[y][x] });

            newFields[y][x].value = parseInt(v);
            
            newFields = checkBoard(newFields);
        }

        setFields(newFields);
    }

    const getRow = (y) => {
        let resultSet = fields[y] || [];

        return resultSet.filter(item => !!item.value).map(field => parseInt(field.value));
    }
    
    const getColumn = (x) => {
        let resultSet = [];
        
        fields.slice().map((row) => resultSet.push(row[x] || null));
        
        return resultSet.filter(item => !!item.value).map(field => parseInt(field.value));
    }
    
    const getSection = (y,x) => {
        const resultSet = [];
        const section = Math.sqrt(length);

        const startY = Math.floor(y / section) * section;
        const startX = Math.floor(x / section) * section;

        fields
            .slice(startY, startY + section)
            .map(row => resultSet.push(...row.slice(startX, startX + section)));

        return resultSet.filter(item => !!item.value).map(field => parseInt(field.value));
    }
    
    const checkBoard = (boardFields) => {
        return boardFields
            .map((row, y) => 
                row.map((col, x) => {
                    if(col.value) {
                        col.error = !!(
                            getRow(y).filter(duplicated).includes(col.value) ||
                            getColumn(x).filter(duplicated).includes(col.value) ||
                            getSection(y, x).filter(duplicated).includes(col.value)
                        );
                    }
                    
                    const values = [];

                    values.push(...getRow(y));
                    values.push(...getColumn(x));
                    values.push(...getSection(y, x));
                    
                    const uniqueValues = values.filter(unique);
                    col.possible = [...Array(length).keys()]
                        .map(x => x + 1)
                        .filter(x => !uniqueValues.includes(x));

                    return col;
                })
            );
    }

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