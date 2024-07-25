import React from "react";

const TextArea =(props) => {
    return (
        <div className='mb-3'>
            <label htmlFor={props.name} className={'form-label'}>
                {props.title}
            </label>
            <textarea
                id={props.name}
                className={'form-control'}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.title}
                rows={props.rows}
            />
        </div>
    )
}
export default TextArea