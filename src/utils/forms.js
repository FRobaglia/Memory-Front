import { useState } from 'react'

export const useForm = () => {
  
  const [ state, setState ] = useState({})

  const handleChange = e => {
    // Need to persist the event
    e.persist();
    if (e.target.files) {
      console.log(fileObjectToArray(e.target.files))
      setState(state => ({...state, [e.target.name]: fileObjectToArray(e.target.files) }))
    } else {
      setState(state => ({...state, [e.target.name]: e.target.value }))
    }
  } 

  return [state, handleChange]
}

export const toFormData = (values) => {
  console.log(values)
}

const fileObjectToArray = (fileObject) => {
  const files = Object.values(fileObject).length > 1 ? Object.values(fileObject) : fileObject[0]
  return files
}