import { useState } from "react";
import "./App.css";
/**
 * App component for an Image Optimizer application.
 * It handles image selection, quality adjustment, and image upload and compression.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quality, setQuality] = useState(80);
  const [compressedImageUrl, setCompressedImageUrl] = useState(null);
  /**
   * Handles the image change event.
   *
   * @param {Object} e - The event object.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  /**
   * Handles the form submission for image upload and compression.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("quality", quality);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a URL for the Blob
      const imageUrl = URL.createObjectURL(blob);

      // Set the image URL to state to display it in the UI
      setCompressedImageUrl(imageUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload and compress the image");
    }
  };
  /**
   * Handles the quality change event.
   * It updates the quality in the state and changes the background of the slider.
   *
   * @function handleQualityChange
   * @param {Object} e - The change event object.
   */

  const handleQualityChange = (e) => {
    const value = e.target.value;
    setQuality(value);
    // Update the slider background
    const percentage =
      ((value - e.target.min) / (e.target.max - e.target.min)) * 100;
    e.target.style.background = `linear-gradient(90deg, #64ffda ${percentage}%, #2a2d3e ${percentage}%)`;
  };

  return (
    <div className="container">
      <h1>Image Optimizer</h1>
      <form onSubmit={handleSubmit}>
        <div className="upload-container">
          <label className="file-input-button">
            Choose a file
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              aria-label="Choose an image file"
            />
          </label>
          {selectedImage && <p>Selected file: {selectedImage.name}</p>}

          <div className="slider-container">
            <label htmlFor="quality">Quality: {quality}%</label>
            <input
              type="range"
              id="quality"
              min="1"
              max="100"
              value={quality}
              onChange={handleQualityChange}
              className="quality-slider"
              aria-label="Image quality slider"
            />
          </div>
        </div>
        <button type="submit">Upload Image</button>
      </form>

      {/* Display the compressed image */}
      {compressedImageUrl && (
        <div className="compressed-image-container">
          <h2>Compressed Image</h2>
          <img
            src={compressedImageUrl}
            alt="Compressed"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
