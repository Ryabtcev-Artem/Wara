import { Link, useNavigate } from "react-router-dom";
import "../styles/blocks/AgreementInfo.scss";

export default function AgreementInfo() {
    const navigate = useNavigate();
    return (
        <section className="agreement">
            <div className="agreement__container container">
                <Link
                    className="normal-link"
                    onClick={() => {
                        if (window.history.length <= 2) {
                            navigate("/");
                        } else {
                            navigate(-1);
                        }
                    }}
                >
                    Вернуться
                </Link>
                <h1 className="agreement__title">
                    Пользовательское соглашение
                </h1>

                <p className="agreement__text">
                    Настоящее Пользовательское соглашение (далее — «Соглашение»)
                    регулирует отношения между владельцем сайта и пользователями
                    при использовании данного веб-приложения.
                </p>

                <h2 className="agreement__subtitle">1. Общие положения</h2>
                <p className="agreement__text">
                    Используя сайт, вы соглашаетесь с условиями настоящего
                    Соглашения. Если вы не согласны с какими-либо пунктами,
                    пожалуйста, прекратите использование сайта.
                </p>

                <h2 className="agreement__subtitle">2. Использование сайта</h2>
                <p className="agreement__text">
                    Вы обязуетесь использовать сайт только в законных целях и не
                    предпринимать действий, нарушающих права третьих лиц.
                </p>

                <h2 className="agreement__subtitle">3. Ответственность</h2>
                <p className="agreement__text">
                    Владелец сайта не несёт ответственности за возможные сбои,
                    ошибки, перерывы в работе или потерю данных. Сайт
                    предоставляется «как есть», без каких-либо гарантий.
                </p>

                <h2 className="agreement__subtitle">4. Персональные данные</h2>
                <p className="agreement__text">
                    Мы не собираем и не обрабатываем ваши персональные данные в
                    рамках данного проекта. Все данные, вводимые на сайте,
                    остаются только в рамках сессии пользователя.
                </p>

                <h2 className="agreement__subtitle">5. Изменения условий</h2>
                <p className="agreement__text">
                    Владелец сайта оставляет за собой право изменять настоящее
                    Соглашение в любое время без предварительного уведомления.
                    Актуальная версия всегда доступна на этой странице.
                </p>

                <p className="agreement__text agreement__text--note">
                    Последнее обновление:{" "}
                    {new Date().toLocaleDateString("ru-RU")}
                </p>
            </div>
        </section>
    );
}
