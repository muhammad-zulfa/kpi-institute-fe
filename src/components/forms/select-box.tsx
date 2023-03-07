import React, { FC, SelectHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  Icon?: IconType;
  iconPosition?: "left" | "right";
  error?: string;
  options: { value: string; label: string }[];
}

const SelectBox: FC<SelectBoxProps> = React.forwardRef<
  HTMLInputElement,
  SelectBoxProps
>(({
  className,
  placeholder = "Select an option",
  Icon,
  iconPosition = "left",
  error,
  options,
  ...rest
}, ref) => {
  return (
    <div className={`relative flex flex-col ${className}`}>
      <div
        className={`relative flex items-center border rounded-md px-3 py-2 ${
          error ? "border-red-500" : ""
        }`}
      >
        {Icon && (
          <span
            className={`absolute inset-y-0 ${
              iconPosition == "left" ? "left-0 pl-4" : "right-0 pr-4"
            } flex items-center `}
          >
            <Icon size="0.8em" />
          </span>
        )}
        <select
          className={`appearance-none bg-transparent w-full py-1 px-2 leading-tight focus:outline-none ${
            Icon
              ? iconPosition == "left"
                ? `pl-8 pr-2`
                : `pr-8 pl-2`
              : `pl-3 pr-3`
          }`}
          defaultValue=""
          placeholder={placeholder}
          {...rest}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="text-red-500 mt-1 text-sm font-light">{error}</div>
      )}
    </div>
  );
});

export default SelectBox;
