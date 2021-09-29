import { useState, useEffect } from 'react';
import './style.css';
import Column from '../column';

const Row = ({columns, row, changeHandler}) => {
    const [cols, setCols] = useState(columns);

    const changeFieldHandler = (x, value) => {
        changeHandler(row, x, value);
    }

    return (
        <div className={`row row-${row}`}>
            {cols.map((col, key) => (
                <Column 
                    value={col} 
                    column={key} 
                    changeHandler={changeFieldHandler} 
                />
            ))}
        </div>
    );
}

export default Row;