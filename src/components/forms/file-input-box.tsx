import React, { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import { HiUpload } from "react-icons/hi";
import { FaFilePowerpoint, FaTrash } from "react-icons/fa";
import { toMB } from "@utils/helper";
interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList) => void;
  error?: string
}

interface FileObject {
  file: File;
  preview: string;
  type: "ppt" | "image" | "video" | "other";
}

const FileInputBox: FC<FileInputProps> = React.forwardRef<
  HTMLInputElement,
  FileInputProps
>(({
  className,
  label = "Choose file",
  accept,
  multiple,
  onChange,
  error,
  ...rest
}, ref) => {
  const [files, setFiles] = useState<FileObject[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const newFiles: FileObject[] = Array.from(fileList).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        type: getFileType(file.type),
      }));
      if(!multiple) {
        setFiles(newFiles);
      } else {
        setFiles((prevFiles) => prevFiles.concat(newFiles));
      }
      onChange && onChange(fileList);
    }
  };

  const handleFileDelete = (file: FileObject) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.file !== file.file)
    );
  };

  const getFileType = (fileType: string): FileObject["type"] => {
    switch (fileType) {
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "ppt";
      case "image/jpeg":
      case "image/png":
      case "image/gif":
      case "image/svg+xml":
        return "image";
      case "video/mp4":
      case "video/quicktime":
      case "video/x-msvideo":
        return "video";
      default:
        return "other";
    }
  };

  const renderFilePreview = () => {
    if (files.length === 0) {
      return null;
    }

    return (
      <div className="flex mt-4 space-x-2">
        {files.map((file) => (
          <div
            key={file.file.name}
            className={`flex flex-col ${multiple ? 'w-1/2' : 'w-full'} relative items-center mb-2 bg-white rounded-md shadow-sm border`}
          >
            {file.type === "image" ? (
              <img
                src={file.preview}
                alt={file.file.name}
                className="object-contain w-full rounded-l-md p-2"
              />
            ) : file.type === "video" ? (
              <video
                src={file.preview}
                className="h-60 rounded-l-md p-2"
                controls
              />
            ) : file.type === "ppt" ? (
              <div className="h-24 w-32 rounded-l-md p-2 flex flex-col justify-center items-center">
                <FaFilePowerpoint size={40} />
              </div>
            ) : (
              <div className="h-24 w-32 rounded-l-md p-2 flex flex-col justify-center items-center">
                <FaFilePowerpoint size={40} />
              </div>
            )}
            <div className="absolute bottom-0 w-full">
              <div className="flex items-center justify-between w-full px-2 py-1 bg-gray-100 rounded-br-md rounded-bl-md bg-opacity-90">
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {file.file.name}
                  </div>
                  <div className="text-sm text-gray-700 truncate">
                    {toMB(file.file.size)} MB
                  </div>
                </div>

                <button
                  type="button"
                  className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => handleFileDelete(file)}
                >
                  <span className="sr-only">Remove file</span>
                  <FaTrash
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-md tracking-wide border border-gray-300 cursor-pointer transition-colors">
        <div className="flex flex-col items-center space-y-2">
          <HiUpload size="1.5em" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <input
          ref={null}
          className="hidden"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          {...rest}
        />
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {renderFilePreview()}
    </div>
  );
});

export default FileInputBox;
