import React from 'react';
import ModifyIcon from '../../../assets/svg/icons/icon-modify-image.svg';

function UploadInput({
  labelText,
  specificFieldName,
  isMultiple,
  handleChange,
  restrictedFileTypes,
  labelImg,
  labelImgSelected,
}) {
  const fieldName = specificFieldName || 'images';

  return (
    <div className="upload">
      <label className="input__label" htmlFor={fieldName}>
        {labelText}
        {labelImg && (
          <img
            src={labelImg}
            alt="upload pic"
            style={{ display: labelImgSelected && 'none' }}
          />
        )}
        {labelImgSelected && (
          <img
            src={ModifyIcon}
            className="label-img-selected"
            alt="modify pic"
          />
        )}
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
