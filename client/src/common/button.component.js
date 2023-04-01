const Button = ({ type, text, className, onEvent, disabled }) => (
    <button type={type} className={className} onClick={onEvent} disabled={disabled}>
        {text}
    </button>
)

export default Button