import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/blocks/Confirming.scss";
import useNavigatePrev from "../hooks/useNavigatePrev";
import { useAuth } from "../../../AutoContext";
export default function Confirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const login = location.state?.login || "";
    const password = location.state?.password || "";
    const code = location.state?.code || "";
    const [currentCode, setCurrentCode] = useState(code);
    const {checkAuth } = useAuth()
    const goBack = useNavigatePrev();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        if (data.code !== currentCode) {
            return;
        }
        try {
            await axios.post(
                "https://wara-server.up.railway.app/api/users",
                {
                    email: email,
                    login: login,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            await checkAuth()
            navigate("/");
        } catch (err) {
            console.log(err);
        }
        reset();
    };
    return (
        <div className="auth-form-wrapper">
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <Link
                    onClick={goBack}
                    type="button"
                    className="auth-form__close close-page"
                >
                    <span></span>
                    <span></span>
                </Link>
                <h2>Подтверждение email</h2>
                <p>
                    Вы успешно зарегистрированы. На адрес
                    {<strong>{" " + email}</strong>} отправлено письмо с кодом
                    подтверждения, введите его для завершения регистрации.
                </p>
                <div className="auth-form__field">
                    <label htmlFor="code">Код подтверждения</label>
                    <input
                        {...register("code", {
                            required: "Обязательное поле",
                            pattern: {
                                value: /^\d{6}$/,
                                message: "Введите ровно 6 цифр",
                            },
                        })}
                        className="auth-form__input"
                        id="code"
                        inputMode="numeric"
                        type="text"
                    />
                    {errors.code && (
                        <span className="red">{errors.code.message}</span>
                    )}
                </div>
                <div className="auth-form__field">
                    <button className="auth-form__submit btn">
                        Подтвердить
                    </button>
                </div>
                <div className="auth-form__field send-again">
                    <span>
                        <button
                            onClick={async (event) => {
                                const target = event.target;
                                if (target.classList.contains("sending")) {
                                    return;
                                }
                                target.classList.add("sending");
                                const timeout = setTimeout(() => {
                                    target.classList.remove("sending");
                                    clearTimeout(timeout);
                                }, 2100);
                                const response = await axios.post(
                                    "https://wara-server.up.railway.app/api/send-email",
                                    { email: email }
                                );
                                setCurrentCode(response.data.code);
                            }}
                            type="button"
                            className="auth-form__send-again"
                        >
                            Отправить повторно
                        </button>
                    </span>
                </div>
            </form>
        </div>
    );
}
