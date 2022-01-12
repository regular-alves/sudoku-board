import React, { useState } from 'react';
import Toogle from '../Toogle';
import Timer from '../Timer';
import Row from '../Row';

import './style.css';
import { useEffect } from 'react/cjs/react.development';

const Board = ({ length }) => {
    const storageFields = JSON.parse(localStorage.getItem('sudoku-board-fields'));
    const defaultObject = {
        value: null, 
        error: false,
        possible: Array.from(Array(length).keys())
    };

    const [darkTheme, setDarkTheme] = useState(localStorage.getItem('sudoku-board-dark-theme')==='1');
    const [tips, setTips] = useState(localStorage.getItem('sudoku-board-show-tips')==='1');
    const [started, setStarted] = useState(false);
    const [fields, setFields] = useState(
        storageFields && storageFields.length>0
        ? storageFields.map(row => row.map(col => {
            let field = JSON.parse(JSON.stringify(defaultObject)); 
            return {
                ...field,
                value: col
            };
        }))
        : JSON.parse(JSON.stringify(Array(9).fill(Array(9).fill(defaultObject))))
    );
  
    const duplicated = (val, i, self) => self.indexOf(val) !== i;
    const unique = (val, i, self) => self.indexOf(val) === i;

    useEffect(() => {
        localStorage.setItem(
            'sudoku-board-fields', 
            JSON.stringify(fields.map(row => row.map(col => col?.value ?? null)))
        );
    }, [fields]);

    const setField = (y,x,v) => {
        if(!started && !!v) {
            setStarted(true);
        }

        let newFields = fields.slice();
        
        if(newFields[y][x]!==undefined) {
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
                    }else{
                        col.error = false;
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

    checkBoard(fields);

    return (
        <div className={`wrapper ${darkTheme ? 'dark' : ''} ${tips ? 'show-tips' : ''}`}>
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
            <div className="side-bar">
                <div className="settings">
                    <Toogle 
                        text={'Dark theme'} 
                        checked={darkTheme}
                        onChange={(e) => {
                            console.log(!e.target.checked);

                            localStorage.setItem(
                                'sudoku-board-dark-theme', 
                                e.target.checked ? 1 : 0
                            );

                            setDarkTheme(e.target.checked ? 1 : 0);
                        }}
                    />
                    <Toogle 
                        text={'Show tips'} 
                        checked={tips}
                        onChange={(e) => {
                            localStorage.setItem(
                                'sudoku-board-show-tips', 
                                e.target.checked ? 1 : 0
                            );

                            setTips(e.target.checked ? 1 : 0);
                        }}
                    />
                </div>
                <Timer 
                    started={started} 
                    state={localStorage.getItem('sudoku-board-time')} 
                    setState={(took) => {
                        localStorage.setItem('sudoku-board-time', took);
                    }}
                />
                <ul className="history"></ul>
            </div>
        </div>
    );
}

export default Board;