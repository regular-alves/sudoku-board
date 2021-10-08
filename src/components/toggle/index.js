import react from 'react';

const Toogle = ({onChange, text}) => {
    return (
        <div>
            <span>{text}</span>
            <label>
                <input type="checkbox" value="1" onChange={onChange} />
            </label>
        </div>
    )
};

export default Toogle;