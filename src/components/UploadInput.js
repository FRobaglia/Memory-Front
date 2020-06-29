import React from 'react';

function UploadInput({
  labelText,
  specificFieldName,
  isMultiple,
  handleChange,
  restrictedFileTypes,
}) {
  const fieldName = specificFieldName || 'images';
  return (
    <div className="upload">
      <label htmlFor={fieldName}>{labelText} : </label>
      <input
        type="file"
        id={fieldName}
        name={fieldName}
        multiple={isMultiple}
        accept={restrictedFileTypes}
        onChange={handleChange}
      />
    </div>
  );
}

export default UploadInput;
