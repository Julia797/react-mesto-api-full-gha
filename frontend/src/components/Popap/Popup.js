function Popup({ name, children, isOpen, onClose }) {
 
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onMouseDown={onClose}>
      <div className={`popup__container ${name === 'infoTooltip' && 'popup__container_infoTooltip'}`} onMouseDown={(evt => evt.stopPropagation())}>
        {children}
        <button
          className="popup__btn-close button"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Popup
