import useFormValidation from "../../hooks/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddPlace, isSending }) {

  const { values, errors, isValid, isInputValid, handleChange, resetForm } = useFormValidation()
  
  function resetFormByClose() {
    onClose()
    resetForm({title: '', link: ''})
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({ title: values.title, link: values.link }, resetForm)
  }
    
  return (
    <PopupWithForm 
      name='newFoto' 
      title='Новое место' 
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
            id="foto-input"
            placeholder="Название"
            className={`form__item form__item_type_nameFoto ${isInputValid.title === undefined || isInputValid.title ? '' : 'form__item_type_error'}`}
            name="title"
            required
            minLength={2}
            maxLength={30}
            value={values.title ? values.title : ''}
            onChange={handleChange}
          />
          <span className="form__input-error foto-input-error">{errors.title}</span>
        </label>
        <label className="form__label">
          <input
            type="url"
            id="url-input"
            placeholder="Ссылка на картинку"
            className={`form__item form__item_type_newFoto ${isInputValid.link === undefined || isInputValid.link ? '' : 'form__item_type_error'}`}
            name="link"
            required
            value={values.link ? values.link : ''}
            onChange={handleChange}
          />
          <span className="form__input-error url-input-error">{errors.link}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
