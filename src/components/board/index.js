import React, { useEffect, useState } from 'react';
import './style.css';
import Row from '../row';

const Board = ({length}) => {
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

    const setField = (y,x,v) => {
        let newFields = fields.slice();
        
        if(newFields[y][x]!==undefined) {
            newFields[y][x] = {
                value: v,
                error: false
            }
        }

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

        return resultSet.filter(item => !!item);
    }
    
    const getColumn = (x) => {
        let resultSet = [];
        
        fields.slice().map((row) => {
            return resultSet.push(row[x] || null);
        });
        
        return resultSet.filter(item => !!item);
    }
    
    const getSection = (y,x) => {
        let resultSet = [];

        fields.slice(
            Math.floor(y / section) * section,
            section
        ).map(
            row => {
                resultSet.push(
                    ...row.slice(
                        Math.floor(x / section) * section,
                        section
                    ).map(col => col?.value || 0)
                );

                return;
            }
        ).filter(item => !!item);
        
        return resultSet.filter(item => !!item);
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