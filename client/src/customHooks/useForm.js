import e from 'cors';
import { useState } from 'react';

// handle form fields dynamically
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  console.log(values);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
};

export default useForm;
