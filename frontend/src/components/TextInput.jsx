const TextInput = ({ placeholder, inputType, field, value, onChange }) => {
  return (
    <input
      className=" no-spinner border rounded-lg h-10 px-3 border-white focus:ring-1 transition-all duration-150 ring-0 focus:ring-white focus:ring-offset-1 focus:outline-none my-2 mx-2"
      placeholder={placeholder}
      type={inputType}
      value={value}
      step="0.01"
      onChange={(e) => onChange(field, e.target.value)}
    />
  );
};

export default TextInput;
