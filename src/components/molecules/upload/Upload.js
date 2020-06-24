import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useForm, toFormData} from '../../../utils/forms'

function Upload() {
  const [ values, handleChange ] = useForm();

  const handleUploadClick = async () => {
    try {
      const data = toFormData(values)
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}post/upload`, data)
      console.log(response)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="upload">
    <input type="text" name="firstname" value={values.firstname || ""} onChange={handleChange}/>
      <input type="file" name="file" multiple value={""} onChange={handleChange}/>
      <button type="button" onClick={handleUploadClick}>Upload</button> 
    </form>
  )
}

export default Upload
