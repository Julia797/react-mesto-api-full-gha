import Popup from "../Popap/Popup";

function PopupWithForm({ name, title, nameButton, children, isOpen, onClose, onSubmit, isValid=true, isSending }) {
 
  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className={`popup__heading ${name === 'confirmDeletion' && 'popup__heading-delete'}`}>{title}</h2>
      <form className="form form_contacts" noValidate name={name} onSubmit={onSubmit}>
        {children}
        <button className={`form__btn-save ${isValid ? '' : 'form__btn-save_inactive'} ${isSending ? 'form__btn-save_loading' : ''}`} type="submit" aria-label="сохранить">
          {isSending ? '' : nameButton}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm

