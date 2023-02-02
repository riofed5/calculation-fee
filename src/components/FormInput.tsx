import { useState } from "react";
import "./formInput.css";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    focused?: string;
  }
}

type FormInputType = {
  label: string;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: number;
  name: string;
  min: string;
  value: string;
  type: string;
};

const FormInput = (props: FormInputType) => {
  const [focused, setFocused] = useState(false);
  const { label, type, min, errorMessage, onChange, id, name, ...inputProps } =
    props;

  const handleFocus = (e: React.FormEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      {type === "datetime-local" ? (
        <input
          name={name}
          type={type}
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => name === "confirmPassword" && setFocused(true)}
          focused={focused.toString()}
          min={min}
        />
      ) : (
        <input
          name={name}
          type={type}
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => name === "confirmPassword" && setFocused(true)}
          focused={focused.toString()}
        />
      )}
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
