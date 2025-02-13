import React from 'react';

const AvatarUpload = ({ value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor="avatarUrl" className="form-label">
        Avatar URL
        <span aria-label="required">*</span>
      </label>
      <input
        id="avatarUrl"
        type="url"
        name="avatarUrl"
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder="Enter Cloudinary or image URL"
        required
        aria-describedby="avatarUrl-error"
      />
      {error && <div id="avatarUrl-error" className="error-message">{error}</div>}
    </div>
  );
};

export default AvatarUpload;