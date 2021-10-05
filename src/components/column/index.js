import React from 'react';
import './style.css';

export default class Column extends React.Component {
    constructor(props) {
        super(props);

        this.sectionLength = Math.sqrt(this.props.boardLength);
        this.lastOfSection = (this.props.column + 1) % this.sectionLength===0;
    }

    render() {
        return (
            <div 
                className={
                    `column column-${this.props.column} ` + 
                    `section-${Math.floor((this.props.column + this.sectionLength) / this.sectionLength)} ` +
                    `${this.lastOfSection ? 'section-last' : ''} ` +
                    `${this.props?.hasColumnError ? 'error' : ''}` 
                }
            >
                <input 
                    id={`input-${this.props.row}-${this.props.column}`}
                    type="text" 
                    value={this.props.value}
                    ref={this.inputRef}
                    onChange={(e) => {
                        this.props.changeHandler(this.props.column, e.target.value);
                    }}
                />
            </div>
        );
    }
}