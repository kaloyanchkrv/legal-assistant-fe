import React, { useState } from "react";
import { Group, Button, Text, Paper } from "@mantine/core";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Use any to bypass the TypeScript checks temporarily
  const groupProps = {
    direction: "column",
    spacing: "xs",
    align: "center",
  };

  return (
    <Paper style={{ padding: "1rem" }} shadow="xs" withBorder>
      <Group {...groupProps}>
        <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-upload" />
        <label htmlFor="file-upload">
          <Button component="span">Upload a file</Button>
        </label>
        {selectedFile && <Text>{selectedFile.name}</Text>}
      </Group>
    </Paper>
  );
};

export default FileUpload;
