import logo from "/logo.webp";
import loginSvg from "../images/Header/login.svg";
import profileSvg from "../images/Header/profile.svg";
import "../styles/blocks/Header.scss";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../AutoContext.jsx";
export default function Header() {
    const {isAuth,login} = useAuth()
    return (
        <header className="header container">
            <div className="header-wrapper">
                <img
                    loading="lazy"
                    src={logo}
                    width={36}
                    height={36}
                    className="header__logo"
                    alt="vite logo"
                />
                <nav className="header__menu">
                    <NavLink
                        to={"/"}
                        className={`header__tab ${({ isActive }) =>
                            isActive ? "active" : ""}`}
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        to={"/users"}
                        className={`header__tab ${({ isActive }) =>
                            isActive ? "active" : ""}`}
                    >
                        Пользователи
                    </NavLink>
                </nav>
                {!isAuth && <Link
                    className="header__login"
                    to={"/login"}
                >
                    <img
                        width={20}
                        height={20}
                        src={loginSvg}
                        loading="lazy"
                        alt="login"
                    />
                    <span>Войти</span>
                </Link>}
                {isAuth && <Link
                    className="header__profile"
                    to={`users/${login}`}
                >
                    <img
                        width={35}
                        height={35}
                        src={profileSvg}
                        loading="lazy"
                        alt="login"
                    />
                </Link>}
            </div>
        </header>
    );
}
