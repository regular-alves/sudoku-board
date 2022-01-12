import './style.css';

const Toogle = ({onChange, text, checked = false}) => {
    return (
        <div className="toogle-button">
            <span>{text}</span>
            <label>
                <input type="checkbox" value="1" onChange={onChange} checked={!!checked}/>
                <span>&nbsp;</span>
            </label>
        </div>
    )
};

export default Toogle;