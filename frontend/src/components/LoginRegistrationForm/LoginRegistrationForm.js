import { Link } from 'react-router-dom';

function LoginRegistrationForm({ nameForm, title, nameButton, onSubmit, children, isValid=true, isSending }) {
 
  return (
    <section className="loginRegistrationForm">
      <p className="loginRegistrationForm__title">{title}</p>
      <form className={`form form_${nameForm}`} noValidate name={nameForm} onSubmit={onSubmit}>
        {children}
        <button className={`form__btn-enter ${isValid ? '' : 'form__btn-enter_inactive'} ${isSending ? 'form__btn-enter_loading' : ''}`} type="submit" aria-label={nameButton}>{nameButton}</button>
      </form>
      {nameForm === `signup` && <p className="loginRegistrationForm__subtitle">Уже зарегистрированы? <Link className="loginRegistrationForm__link button" to={'/sign-in'}>Войти</Link></p>}
    </section>
  );
}

export default LoginRegistrationForm;

