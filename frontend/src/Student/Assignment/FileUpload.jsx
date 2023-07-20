import React, { useState } from 'react';
import { Box } from '@mui/system';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now upload the selected file to the server or perform any other action
    console.log(selectedFile);
  };

  return (
    <Box sx={{mb: 3, mt: 3,}}>
        <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileInput} />
      <button type="submit">Upload</button>
    </form>
    
    </Box>
        
  );
}

export default FileUpload;
