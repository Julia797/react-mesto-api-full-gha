function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_zoom  ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__containerZooom" onClick={(evt => evt.stopPropagation())}>
        <img className="popup__fotoZoom" src={card.link} alt={card.name}/>
        <h2 className="popup__titleZoom">{card.name}</h2>
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

export default ImagePopup