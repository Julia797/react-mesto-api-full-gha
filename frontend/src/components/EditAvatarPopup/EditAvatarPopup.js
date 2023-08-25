import { useRef } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSending }) {
  const input = useRef()
  const { values, errors, isValid, isInputValid, handleChange, resetForm } = useFormValidation()

  function resetFormByClose() {
    onClose()
    resetForm({linkupdateAvatar: ''})
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({linkupdateAvatar: input.current.value}, resetForm)
  }
  
  return (
    <PopupWithForm 
      name='updateAvatar' 
      title='Обновить аватар' 
      nameButton='Сохранить'
      isOpen={isOpen}
      onClose={resetFormByClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      isSending={isSending}
      >
      <fieldset className="form__inputAvatar">
        <label className="form__label">
          <input
            ref={input}
            type="url"
            id="url-inputAvatar"
            placeholder="Введите ссылку на фото"
            className={`form__item form__item_type_updateAvatar ${isInputValid.linkupdateAvatar === undefined || isInputValid.linkupdateAvatar ? '' : 'form__item_type_error'}`}
            name="linkupdateAvatar"
            value={values.linkupdateAvatar ? values.linkupdateAvatar : ''}
            required
            onChange={handleChange}
          />
          <span className="form__input-error url-inputAvatar-error">{errors.linkupdateAvatar}</span>
        </label>
      </fieldset> 
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
