import usePageTitle from "../assets/hooks/usePageTitle";
import { Link } from "react-router-dom";
import "../assets/styles/pages/NotFound.scss"
export default function NotFound() {
    usePageTitle("404 — Страница не найдена");

    return (
        <div className="not-found">
            <div className="not-found__message">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__description">Страница устарела, была удалена или не существовала вовсе</p>
            </div>
            <Link className="not-found__back-home" to="/">
                Вернуться на главную страницу
            </Link>
        </div>
    );
}
