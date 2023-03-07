import { bgColors, ligthColors, textColors } from "@configs/constants";
import { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export interface ToastProps {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  open: boolean;
  onClose: () => void;
}

export const Toast = ({ message, severity, open, onClose }: ToastProps) => {
  useEffect(() => {
    const autoClose = setTimeout(() => {
      onClose();
    }, 3000);

    if (open) {
      autoClose;
    }

    return () => {
      clearTimeout(autoClose);
    }
  }, [open])

  return (
    <div
      id="toast-success"
      className={`fixed transition duration-300 ease-in bottom-0 right-4 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 ${bgColors[severity]} rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
        open ? "scale-100" : "scale-0"
      }`}
      role="alert"
    >
      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${textColors[severity]} ${ligthColors[severity]} rounded-lg dark:bg-green-800 dark:text-green-200`}>
        {severity === "error" && <FaTimes />}
        {severity === "success" &&  <FaCheck /> }
        <span className="sr-only">{severity.toUpperCase()}</span>
      </div>
      <div className="ml-3 flex flex-col">
        <div className="font-semibold text-white">{severity.toUpperCase()}</div>
        <div className="text-sm font-normal text-white">{message}</div>
      </div>
    </div>
  );
};