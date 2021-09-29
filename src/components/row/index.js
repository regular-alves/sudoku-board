import { useState, useEffect } from 'react';
import './style.css';
import Column from '../column';

const Row = ({columns, row}) => {
    const [cols, setCols] = useState(columns);

    return (
        <div className={`row row-${row}`}>
            {cols.map((col, key) => (<Column value={col} column={key} />))}
        </div>
    );
}

export default Row;