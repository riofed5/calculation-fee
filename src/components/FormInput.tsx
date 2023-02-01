import { useState } from "react";
import "./formInput.css";

const getCurrentTimeInFormat = () => {
  const now = new Date();

  return now.toISOString().slice(0, 11) + now.toLocaleTimeString().slice(0, 5);
};
const FormInput = (props: any) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, name, ...inputProps } = props;

  const handleFocus = (e: React.FormEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  const minTime = getCurrentTimeInFormat();

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        name={name}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        min={label === "Time Delivery" && minTime}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
