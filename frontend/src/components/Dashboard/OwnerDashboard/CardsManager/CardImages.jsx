import { useState } from "react";
import "./CardImages.css";
import { updateCardImage } from "../../../../services/cardServices";

export default function CardImages({ profile, card }) {

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {

    setError("");
    setSuccess("");

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    /* VALIDATION */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    const MAX_SIZE = 1024 * 1024 * 2; // 2MB

    if (selectedFile.size > MAX_SIZE) {
      setError("Image must be smaller than 2MB.");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(selectedFile);
  };


const handleUpload = async () => {

  if (!file) {
    setError("Please select an image first.");
    return;
  }

  try {

    setLoading(true);
    setError("");
    setSuccess("");

    /* UPLOAD TO CLOUDINARY */

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "studyloop_cards");

    const cloudRes = await fetch(
      "https://api.cloudinary.com/v1_1/dmtpxnlpn/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const cloudData = await cloudRes.json();

    if (!cloudData.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    /* SAVE URL IN DATABASE */

    const res = await updateCardImage(card._id, {
      image: cloudData.secure_url
    });
    setPreview(res.image + "?t=" + Date.now());
    setPreview(cloudData.secure_url + "?t=" + Date.now());
    setSuccess("Image uploaded successfully!");
    setFile(null);

  } catch (err) {

    console.error(err);
    setError("Upload failed. Please try again.");

  } finally {
    setLoading(false);
  }

};


  if (!card) {
    return <p>No card selected.</p>;
  }

  return (
    <div className="card-images-container">

      <h3>Card Images</h3>

      <div className="image-card">

        <h4>{card?.teach?.subject || card?.subject}</h4>

        <div className="image-preview-box">

          <img
            src={
              preview ||
              card?.image ||
              profile?.profilePhoto ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="preview"
          />

        </div>

        {/* MESSAGE UI */}

        {error && (
          <div className="upload-error">
            {error}
          </div>
        )}

        {success && (
          <div className="upload-success">
            {success}
          </div>
        )}

        <div className="upload-row">

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>

        </div>

      </div>

    </div>
  );
}