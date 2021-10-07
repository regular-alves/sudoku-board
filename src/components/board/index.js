import React, { useState } from 'react';
import './style.css';
import Row from '../row';

const Board = ({length}) => {
    const defaultObject = {
        value: null, 
        error: true,
    };

    /* const [fields, setFields] = useState(Array(9).fill(Array(9).fill(defaultObject))); */
    const section = Math.sqrt(length);
    const [active, setActive] = useState([0,0]);
    const [fields, setFields] = useState([
        [null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],
    ]);

    const duplicated = (val, i, self) => self.indexOf(val) !== i;

    const setField = (y,x,v) => {
        let newFields = fields.slice();
        
        if(newFields[y][x]!==undefined) {
            newFields[y][x] = {
                ...defaultObject,
                ...{
                    value: v,
                    error: false
                }
            }

            
            newFields = checkBoard(newFields);
        }

        setFields(newFields);

        getSection(y, x);

        let nextY = y;
        let nextX = x + 1;
        
        if(nextX>=length) {
            nextY = nextY + 1;
            nextX = 0;
        }

        if(nextY>=length) {
            nextY = 0;
        }

        setActive([nextY, nextX]);
    }

    const getRow = (y) => {
        let resultSet = fields[y] || [];

        return resultSet.map(field => field?.value).filter(item => !!item);
    }
    
    const getColumn = (x) => {
        let resultSet = [];
        
        fields.slice().map((row) => resultSet.push(row[x] || null));
        
        return resultSet.map(field => field?.value).filter(item => !!item);
    }
    
    const getSection = (y,x) => {
        const resultSet = [];

        fields.slice(
            Math.floor(y / section) * section,
            section
        )
        .map(row => {
            row.slice(
                Math.floor(x / section) * section,
                section
            );

            resultSet.push(...row);

            return row;
        });
        
        return resultSet.map(field => field?.value).filter(item => !!item);
    }

    const checkBoard = (boardFields) => {
        return boardFields
            .map(row => 
                row.map(col => {
                    return {
                        ...defaultObject,
                        ...{
                            error: false,
                            value: col?.value || null
                        }
                    }
                })
            )
            .map((row, y) => 
                row.map((col, x) => {
                    if(col.value && (
                        getRow(y).filter(duplicated).includes(col.value) ||
                        getColumn(x).filter(duplicated).includes(col.value) ||
                        getSection(y, x).filter(duplicated).includes(col.value)
                    )) {
                        col.error = true;
                    }

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
                    activeRow={active[0]}
                    activeColumn={active[1]}
                />
            ))}
        </div>
    );
}

export default Board;