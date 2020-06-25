import React from 'react'

function UploadInput({labelText, specificFieldName, isMultiple, handleChange}) {

  const fieldName = specificFieldName ? specificFieldName : 'image'
  const acceptsOnlyPDF = specificFieldName === 'proof' ? true : false

  return (
    <div className='upload'>
      <label htmlFor={fieldName}>{labelText} : </label>
      <input type="file" id={fieldName} name={fieldName} multiple={isMultiple ? true : false} accept={acceptsOnlyPDF ? 'application/pdf' : ''} onChange={handleChange} />
    </div>
  )
}

export default UploadInput
