import './style.css';
import Column from '../column';

const Row = ({columns, row, changeHandler, boardLength, activeRow, activeColumn}) => {
    const sectionLength = Math.sqrt(boardLength);
    const lastOfSection = (row + 1) % sectionLength===0;

    const changeFieldHandler = (x, value) => {
        changeHandler(row, x, value);
    }

    return (
        <div className={`row row-${row} ${lastOfSection ? 'row-section-last' : ''}`}>
            {columns.map((col, key) => (
                <Column 
                    value={col?.value || 0} 
                    column={key} 
                    row={row}
                    boardLength={boardLength}
                    changeHandler={changeFieldHandler} 
                    isActive={activeRow===row && activeColumn===key}
                    hasError={col?.error || false}
                />
            ))}
        </div>
    );
}

export default Row;