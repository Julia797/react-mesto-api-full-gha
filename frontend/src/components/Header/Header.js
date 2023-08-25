import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function Header({ nameHeader, userEmail }) {
  
 const nameButtonReg = nameHeader === 'signIn' ? 'Регистрация' : nameHeader === 'signUp' ? 'Войти' : 'Выйти'
 
  function onExitOfAccount() {
    if (nameButtonReg === 'Выйти') {
      localStorage.removeItem('token')
    return
    }
    else {
      return
    }
  }
  
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место"/>
      <div className='header__userInfo'>
        <p className={`header__userEmail ${nameHeader === 'free' ? 'header__userEmail_active' : ''}`}>{userEmail}</p>
        <Link className="header__link button" to={nameHeader === 'signUp' ? '/sign-in' : nameHeader === 'signIn' ? '/sign-up' : '/sign-in'} 
          onClick={onExitOfAccount}>{nameButtonReg}</Link>
      </div>
    </header>
  );
}
export default Header

    