import { useState, useEffect } from 'react';
import './style.css';
import Column from '../column';

const Row = ({columns, row, changeHandler, boardLength}) => {
    const sectionLength = Math.sqrt(boardLength.length);
    const lastOfSection = (row + 1) % sectionLength===0;
    const [cols, setCols] = useState(columns);

    const changeFieldHandler = (x, value) => {
        changeHandler(row, x, value);
    }

    return (
        <div className={`row row-${row} ${lastOfSection ? 'row-section-last' : ''}`}>
            {cols.map((col, key) => (
                <Column 
                    value={col} 
                    column={key} 
                    boardLength={boardLength}
                    changeHandler={changeFieldHandler} 
                />
            ))}
        </div>
    );
}

export default Row;