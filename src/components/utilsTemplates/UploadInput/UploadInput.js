import React from 'react';
import ModifyIcon from '../../../assets/icons/settings.svg';

function UploadInput({
  labelText,
  specificFieldName,
  isMultiple,
  handleChange,
  restrictedFileTypes,
  img,
  imgSelected,
}) {
  const fieldName = specificFieldName || 'images';

  return (
    <div className="upload">
      <label htmlFor={fieldName}>
        {labelText}
        {img && (
          <img src={img} alt="pic" className={imgSelected ? 'selected' : ''} />
        )}
        {imgSelected && <img src={ModifyIcon} alt="pic" />}
      </label>
      <input
        type="file"
        id={fieldName}
        name={fieldName}
        multiple={isMultiple}
        accept={restrictedFileTypes}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
}

export default UploadInput;
