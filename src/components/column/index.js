import './style.css';

const Column = ({value, column, changeHandler, boardLength}) => {
    const sectionLength = Math.sqrt(boardLength.length);
    const lastOfSection = (column + 1) % sectionLength===0;

    return (
        <div 
            className={
                `column column-${column} ` + 
                `section-${Math.floor((column + sectionLength) / sectionLength)} ` +
                `${lastOfSection ? 'section-last' : ''}` 
            }
        >
            <input 
                type="text" 
                value={value} 
                onChange={(e) => {
                    changeHandler(column, e.target.value);
                }}
            />
        </div>
    );
}

export default Column;