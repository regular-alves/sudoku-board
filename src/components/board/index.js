import React, { useEffect, useState } from 'react';
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

            const fieldRow = getRow(y)
                .map(col => col.value)
                .filter(col => !!col);

            if(fieldRow.length!==fieldRow.filter(unique).length) {
                newFields = setToRow(newFields, y);
            }
            
            const fieldColumn = getColumn(x)
                .map(col => col.value)
                .filter(col => !!col);

            if(fieldColumn.length!==fieldColumn.filter(unique).length) {
                newFields = setToColumn(newFields, x);
            }

            const fieldSection = getSection(y,x)
                .map(col => col.value)
                .filter(col => !!col);

            if(fieldSection.length!==fieldSection.filter(unique).length) {
                console.log({fieldSection});
            }
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

        return resultSet.filter(item => !!item);
    }
    
    const getColumn = (x) => {
        let resultSet = [];
        
        fields.slice().map((row) => resultSet.push(row[x] || null));
        
        return resultSet.filter(item => !!item);
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
        
        return resultSet.filter(item => !!item);
    }

    const setToColumn = (newFields, x) => {
        return newFields.map(row => {
            if(row.length && row[x]) {
                row[x] = {
                    ...defaultObject,
                    ...{
                        value: row[x]?.value || null,
                        error: true
                    }
                };
            }

            return row;
        })
    }

    const setToRow = (newFields, y) => {
        const values = newFields.slice();

        if(values.length<1 && values[y]) {
            return;
        }

        values[y] = values[y].map(col => {
            return {
                ...defaultObject,
                ...{
                    value: col?.value,
                    error: true
                }
            };
        });

        return values;
    }

    const setToSection = (newFilds,y,x) => {
    }

    const unique = (val, i, self) => self.indexOf(val) === i;

    useEffect(() => console.log(fields), [fields]);

    let columnErrors = Array(length).fill(0);

    fields.slice().map(row => row.map((col, x) => {
        if(col?.error) {
            columnErrors[x]++;
        }

        return col;
    }))

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
                    columnErrors={columnErrors}
                />
            ))}
        </div>
    );
}

export default Board;