import React, { useEffect } from "react";
import "../styles/NumberInput.css";

function CustomNumberInput({ name, label, value, onChange, min, max, step = 0.1 }) {
  const parseSafe = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? min : num;
  };

  const clampValue = (val) => Math.min(Math.max(val, min), max);

  const handleIncrement = () => {
    const newValue = clampValue(parseSafe(value) + step);
    onChange({ target: { name, value: newValue.toFixed(2) } });
  };

  const handleDecrement = () => {
    const newValue = clampValue(parseSafe(value) - step);
    onChange({ target: { name, value: newValue.toFixed(2) } });
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    const regex = /^\d*\.?\d*$/;
    if (regex.test(raw) || raw === "") {
      onChange(e);
    }
  };

  // Ensure initial value is clamped to min if empty or invalid
  useEffect(() => {
    if (value === "" || isNaN(parseFloat(value))) {
      onChange({ target: { name, value: min.toFixed(2) } });
    }
  }, [value, min, onChange, name]);

  return (
    <div className="custom-input-group">
      <label htmlFor={name}>{label}</label>
      <div className="custom-number-input">
        <div className="inputButton" type="button" onClick={handleDecrement}>−</div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          inputMode="decimal"
          placeholder={min.toFixed(1)}
          aria-label={label}
        />
        <div className="inputButton" type="button" onClick={handleIncrement}>+</div>
      </div>
    </div>
  );
}

export default CustomNumberInput;
