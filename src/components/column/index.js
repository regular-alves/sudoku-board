import './style.css';

const Column = ({value, column}) => {
    return (
        <div className={`column column-${column}`}>
            <input type="text" value={value} />
        </div>
    );
}

export default Column;