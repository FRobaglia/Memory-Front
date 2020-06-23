import React, { useState, useEffect } from 'react'

function Upload() {

  const [selectedFiles, setSelectedFiles] = useState(undefined)

  useEffect(() => {
    selectedFiles ? console.log(selectedFiles) : console.log('Pas de fichiers sélectionnés pour l\'instant.')
  }, [selectedFiles])

  const handleChange = (event) => {
    setSelectedFiles(event.target.files)
  }

  const handleUploadClick = () => {
    // envoyer le(s) fichier(s) à l'API en POST
    // axios.post(`${process.env.REACT_APP_API_BASE_URL}api/upload`
  }

  return (
    <form className="upload"> 
      <input type="file" name="file" multiple onChange={handleChange}/>
      {selectedFiles ? <button type="button" onClick={handleUploadClick}>Upload</button>: ''}
    </form>
  )
}

export default Upload