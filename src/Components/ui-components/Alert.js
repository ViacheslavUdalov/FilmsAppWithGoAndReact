const Alert = (props) => {
    return (
        <div className={`alert ${props.alertType}`} role="alert">
            {props.message}
        </div>
    )

}
export default  Alert