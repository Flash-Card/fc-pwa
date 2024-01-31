import { FC } from "react";
import "./brows-file.scss";

interface BrowsFileProps {
  disabled?: boolean;
  children?: React.ReactNode;
  handleFiles(files: FileList): void;
  accept?: string;
}

export const BrowsFile: FC<BrowsFileProps> = ({
  disabled,
  handleFiles,
  children,
  ...rest
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  return (
    <label htmlFor="fileInput" className="brows-file__label">
      {children}
      <input
        id="fileInput"
        disabled={disabled}
        name="file"
        type="file"
        multiple
        onChange={handleFileChange}
        className="brows-file"
        {...rest}
      />
    </label>
  );
};
