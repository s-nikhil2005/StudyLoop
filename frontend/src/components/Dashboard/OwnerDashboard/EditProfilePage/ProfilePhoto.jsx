import { useState, useRef, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import {
  uploadProfilePhoto,
  removeProfilePhoto
} from "../../../../services/profileService";
import "./ProfilePhoto.css";

export default function ProfilePhoto({ profile, user, setProfile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const fileInputRef = useRef(null);

  /* ===============================
     Avatar Letter Priority
  =============================== */
  const avatarLetter =
    profile?.fullName?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    "U";

  /* ===============================
     Choose File
  =============================== */
  const handleChooseFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  /* ===============================
     Save (Upload)
  =============================== */
  const handleSave = async () => {
    if (!selectedFile) return;

    try {
      const res = await uploadProfilePhoto(selectedFile);

      setProfile(res.profile);

      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  /* ===============================
     Remove
  =============================== */
  const handleRemove = async () => {
    try {
      const res = await removeProfilePhoto();
      setProfile(res.profile);

      setPreviewUrl(null);
      setSelectedFile(null);
      setShowRemoveModal(false);
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  /* ===============================
     Cleanup preview memory
  =============================== */
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const imageToShow = previewUrl || profile?.profilePhoto;

  return (
    <>
      {/* Avatar Section */}
      <div className="photo-section">
        <div className="photo-wrapper">
          {imageToShow ? (
            <img
              src={imageToShow}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="letter-avatar">{avatarLetter}</div>
          )}

          {/* 👇 PENCIL OPENS REMOVE MODAL (like your original concept) */}
          <button
            className="edit-photo-btn"
            onClick={() => setShowRemoveModal(true)}
          >
            <FaPencilAlt size={16} />
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <label>Add / Change Image</label>

        <div className="file-row">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChooseFile}
            accept="image/*"
          />

          <button
            className="upload-btn"
            onClick={() => fileInputRef.current.click()}
          >
            Upload
          </button>
        </div>

        {selectedFile && (
          <p className="file-name">Selected: {selectedFile.name}</p>
        )}

        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>

      {/* Remove Modal */}
      {showRemoveModal && (
        <div className="blur-overlay">
          <div className="modal-box">
            <h4 className="modal-title">Remove Profile Photo?</h4>

            <div className="modal-actions">
              <button className="remove-btn" onClick={handleRemove}>
                Remove Photo
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowRemoveModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}