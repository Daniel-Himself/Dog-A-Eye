import React from "react";

const ImageUpload = ({ inputImage, imageRef ,setImage, handleLowlight }) => {
  return (
    <input
      type="file"
      ref={inputImage}
      accept="image/*"
      style={{ display: "none" }}
      onChange={(e) => {
        // When a new image is uploaded, revoke the old image URL and set the new image URL
        if (imageRef) {
          URL.revokeObjectURL(imageRef);
          setImage(null);
        }

        const imageFile = e.target.files[0];
        handleLowlight(imageFile);
      }}    />

  );
};

export default ImageUpload;
