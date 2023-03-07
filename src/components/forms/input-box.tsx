import React, { FC, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: IconType;
  iconPosition?: "left" | "right";
  error?: string | undefined;
}

const InputBox: FC<InputBoxProps> = React.forwardRef<
  HTMLInputElement,
  InputBoxProps
>(
  (
    {
      className,
      type,
      placeholder = "Enter text",
      Icon,
      iconPosition = "left",
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`relative flex flex-col ${className}`}>
        <div
          className={`relative flex items-center border rounded-md px-3 py-2`}
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
          <input
            ref={ref}
            className={`appearance-none bg-transparent w-full py-1 px-2 leading-tight focus:outline-none ${
              Icon
                ? iconPosition == "left"
                  ? `pl-8 pr-2`
                  : `pr-8 pl-2`
                : `pl-3 pr-3`
            } ${
              error ? "border-red-500 focus:outline-1 focus:ring-blue-500" : ""
            }`}
            type={type ?? "text"}
            placeholder={placeholder}
            {...rest}
          />
        </div>
        {error && (
          <div className="text-red-500 mt-1 text-sm font-light">{error}</div>
        )}
      </div>
    );
  }
);

export default InputBox;
