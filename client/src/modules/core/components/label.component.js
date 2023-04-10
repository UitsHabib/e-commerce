const Label = ({ className, htmlFor, text }) => (
  <label htmlFor={htmlFor} className={className}>
    {text}
  </label>
);

export default Label;
