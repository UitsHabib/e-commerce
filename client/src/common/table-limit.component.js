function TableLimit({ onChange, options }) {
    return (
        <select
            onChange={(e) => onChange(e.target.value)}
            aria-label="Default select example"
        >
            {options.map((option, index) => {
                return <option value={option.value}>{option.name}</option>;
            })}
        </select>
    );
}

export default TableLimit;
