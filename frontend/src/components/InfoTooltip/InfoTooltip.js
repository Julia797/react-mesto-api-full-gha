import Popup from '../Popap/Popup';

function InfoTooltip({ name, isSucessful, isOpen, onClose }) {
  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
   >
    <div className={`popup__img-reg ${!isSucessful ? 'popup__img-reg_error' : ''}`}/>
    <h2 className="popup__heading popup__heading_reg">{isSucessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
    </Popup>
  );
}

export default InfoTooltip;
