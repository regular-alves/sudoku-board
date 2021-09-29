import './style.css';

const Column = ({value, column, changeHandler}) => {
    return (
        <div className={`column column-${column}`}>
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