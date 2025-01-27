const Select = (props) => {
    return (
        <div className={'mb-3'}>
            <label htmlFor={props.name} className={'from-label'}>
                {" "}
                {props.title}{" "}
            </label>
            <select
                className={'form-select'}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
            >
                <option value="">{props.placeholder}</option>
                {props.options.map(option => {
                    return (
                        <option key={option.id} label={option.value} className={'form-select'} value={option.id}>{option.value}</option>
                    )
                })}
            </select>
        </div>
    )
}
export default Select