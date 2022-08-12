import logo from '../images/header.svg';
import { Route, Link } from 'react-router-dom';

function Header({ email }) {
    return (
        <header className="header">
            <img src={logo} alt="Лого" className="header__logo" />
            <nav className="header__nav">
              <Route exact path="/">
                <p className="header__nav_email">{email}</p>
                <Link to="/sign-in" className="header__nav_link">Выйти</Link>
              </Route>
              <Route path="/sign-in">
                <Link to="/sign-up" className="header__nav_link">Регистрация</Link>
              </Route>
              <Route path="/sign-up">
                <Link to="/sign-in" className="header__nav_link">Войти</Link>
              </Route>
            </nav>
        </header>
    )
}

export default Header;