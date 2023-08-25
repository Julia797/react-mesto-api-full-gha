import { useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormValidation from '../../hooks/useFormValidation';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, isInputValid, handleChange, resetForm, setValue } = useFormValidation()

  useEffect(() => {
    setValue("username", currentUser.name) 
    setValue("userjob", currentUser.about)
  },[currentUser, isOpen])

  function resetFormByClose() {
    onClose()
    resetForm({ username: currentUser.name, userjob: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ username: values.username, userjob: values.userjob }, resetForm)
  }
   
  return (
    <PopupWithForm 
      name='contacts' 
      title='Редактировать профиль' 
      nameButton='Сохранить'
      isOpen={isOpen}
      onClose={resetFormByClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      isSending={isSending}
    >
      <fieldset className="form__input">
        <label className="form__label">
          <input
            type="text"
            id="name-input"
            placeholder="Введите имя"
            className={`form__item form__item_type_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'form__item_type_error'}`}
            name="username"
            required
            minLength={2}
            maxLength={40}
            value={values.username ? values.username : ''}
            onChange={handleChange}
          />
          <span className="form__input-error name-input-error">{errors.username}</span>
        </label>
        <label className="form__label">
          <input
            type="text"
            id="contact-input"
            placeholder="Введите профессию"
            className={`form__item form__item_type_contact ${isInputValid.userjob === undefined || isInputValid.userjob ? '' : 'form__item_type_error'}`}
            name="userjob"
            required
            minLength={2}
            maxLength={200}
            value={values.userjob ? values.userjob : ''}
            onChange={handleChange}
          />
          <span className="form__input-error contact-input-error">{errors.userjob}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
