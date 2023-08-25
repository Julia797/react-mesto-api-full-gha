import { useState, useCallback } from "react";

function useFormValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isInputValid, setIsInputValid] = useState({})

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    const form = e.target.form
    const validationMessage = e.target.validationMessage
    const valid = e.target.validity.valid

    setValues((values) => {
      return { ...values, [name]: value }
    }) 

    setErrors((errors) => {
      return { ...errors, [name]: validationMessage }
    }) 
    
    setIsInputValid((isInputValid) => {
      return { ...isInputValid, [name]: valid }
    }) 
    
    setIsValid(form.checkValidity())
  }

  function resetForm(newValues = {}, newErrors = {}, newIsValid = false, newIsInputValid = {}) {
    setValues(prevValues => ({ ...prevValues, ...newValues }));
    setErrors(newErrors);
    setIsValid(newIsValid);
    setIsInputValid(newIsInputValid);
  }
  const setValue = useCallback((name, value) => {
    setValues((values) => {
      return { ...values, [name]: value }
    }) 
  }, [])

  return { values, errors, isValid, isInputValid, handleChange, resetForm, setValue }
}

export default useFormValidation
