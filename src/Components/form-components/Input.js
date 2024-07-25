import React from "react";

const Input =(props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className='form-label'>
                {props.title}
            </label>
            <input
                type={props.type}
                id={props.name}
                className={`form-control ${props.className}`}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.title}
            />
            <div className={props.errorDiv}>{props.errorMsg}

            </div>
        </div>
    )
}
export default Input