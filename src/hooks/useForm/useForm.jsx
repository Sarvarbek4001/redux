import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return { formData, setFormData, handleChange };
};
