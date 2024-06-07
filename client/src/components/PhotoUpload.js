import React, { useState } from "react";

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  return (
    <div className="photo-upload-container">
      {selectedFile && (
        <img
          className="photo_upload_img"
          src={URL.createObjectURL(selectedFile)}
          alt="Selected"
        />
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedFile && (
        <div className="file-info">
          <p>파일명: {selectedFile.name}</p>
          <p>파일 크기: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
