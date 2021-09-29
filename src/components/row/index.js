import { useState, useEffect } from 'react';
import Column from '../column';

const Row = ({columns}) => {
    const [cols, setCols] = useState(columns);

    return cols.map(col => (<Column value={col} />));
}

export default Row;