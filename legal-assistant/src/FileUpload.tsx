import React, { useState, DragEvent, useRef, useCallback } from "react";
import styled from "styled-components";

const Dropzone = styled.div<{ isDragActive: boolean }>`
  border: ${({ isDragActive }) => (isDragActive ? "2px solid blue" : "2px dashed grey")};
  padding: 100px; // Increased padding to make the box even larger
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  background-color: ${({ isDragActive }) =>
    isDragActive ? "#e9f5ff" : "transparent"}; // Change background color when dragging
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileName = styled.p`
  margin-top: 20px;
  color: #555;
`;

const FileInput = styled.input`
  display: none;
`;

const FileUpload: React.FC<{ onFileSelect: (file: File | null) => void }> = ({ onFileSelect }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((event: DragEvent<HTMLDivElement>, isEntering: boolean) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(isEntering);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragActive(false);
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        const file = event.dataTransfer.files[0];
        setSelectedFileName(file.name);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const file = event.target.files ? event.target.files[0] : null;
      setSelectedFileName(file ? file.name : "");
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <>
      <Dropzone
        isDragActive={isDragActive}
        onDragOver={(e) => handleDrag(e, true)}
        onDragEnter={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {isDragActive ? (
          "Release to drop the file"
        ) : selectedFileName ? (
          <FileName>{selectedFileName}</FileName>
        ) : (
          "Drag a file here or click to upload"
        )}
      </Dropzone>
      <FileInput
        type="file"
        onChange={handleFileInput}
        ref={fileInputRef}
        accept=".doc,.docx,.pdf,.txt" // Specify accepted file types
      />
    </>
  );
};

export default FileUpload;
