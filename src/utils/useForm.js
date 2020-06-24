import { useState } from 'react';

const useForm = () => {
  const [state, setState] = useState({});

  const handleChange = (e) => {
    // Need to persiste the event
    e.persist();
    setState(() => ({ ...state, [e.target.name]: e.target.value }));
  };

  return [state, handleChange];
};

export default useForm;
