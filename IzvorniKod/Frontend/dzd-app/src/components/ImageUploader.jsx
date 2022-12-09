import React, { useState } from 'react';

function ImageUploader() {
  // State to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Event handler for when the user selects an image
  const handleImageChange = (event) => {
    // Update the selected image in state
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} />}
    </div>
  );
}
export default ImageUploader;