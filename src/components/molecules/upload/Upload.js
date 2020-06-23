import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Upload() {

  const [selectedFiles, setSelectedFiles] = useState(undefined)

  useEffect(() => {
    selectedFiles ? console.log(selectedFiles) : console.log('Pas de fichiers sélectionnés pour l\'instant.')
  }, [selectedFiles])

  const handleChange = (event) => {
    // console.log('handleChange', event.target.files)
    setSelectedFiles(event.target.files[0])
  }

  const handleUploadClick = async () => {
    try {
      console.log('handleUploadClick', selectedFiles)

      const data = new FormData();

      data.append('file', selectedFiles);
      data.append('test', 'value');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}post/upload`,
        data)
      console.log(response)

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="upload">
      <input type="file" name="file" multiple onChange={handleChange}/>
      {selectedFiles ? <button type="button" onClick={handleUploadClick}>Upload</button> : ''}
    </form>
  )
}

export default Upload
