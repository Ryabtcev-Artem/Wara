import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "../styles/blocks/Login-form.scss";
import eyeClosed from "../images/LoginForm/eye-closed.svg";
import eyeOpened from "../images/LoginForm/eye-opened.svg";
import { Link, useNavigate } from "react-router-dom";
import useNavigatePrev from "../hooks/useNavigatePrev";
import { useAuth } from "../../../AutoContext";

export default function LoginForm() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const navigate = useNavigate();
    const { checkAuth } = useAuth();
    const [isEyeOpened, setIsEyeOpened] = useState(false);
    const [isRECAPTCHACompleted, setIsRECAPTCHACompleted] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const goBack = useNavigatePrev();
    const onSubmit = async (data) => {
        if (!isRECAPTCHACompleted) {
            return;
        }
        const normalizedLogin = data.login.toLowerCase().trim();
        const response = await axios.post(
            "https://wara-server.up.railway.app/api/compare-passwords",
            {
                login: normalizedLogin,
                password: data.password,
            },
            {
                withCredentials: true,
            }
        );
        const { isMatch, message, errorType } = response.data;
        if (isMatch) {
            reset();
            await checkAuth();
            navigate("/");
        } else {
            if (errorType === "password") {
                setError("password", { type: "manual", message });
            } else if (errorType === "login") {
                setError("login", { type: "manual", message });
            } else {
                alert("Ошибка: " + message);
            }
        }
    };
    const onCaptchaChacnge = async (token) => {
        const result = await axios.post("https://wara-server.up.railway.app/api/tokens", {
            token,
        });
        if (result.data.verified === true) {
            setIsRECAPTCHACompleted(true);
        }
    };
    return (
        <div className="auth-form-wrapper">
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <Link
                    onClick={() => {
                        goBack();
                    }}
                    className="auth-form__close close-page"
                >
                    <span></span>
                    <span></span>
                </Link>
                <h2>Вход</h2>
                <div className="auth-form__field">
                    <label htmlFor="login">Логин</label>
                    <input
                        {...register("login", {
                            required: "Введите ваш логин",
                        })}
                        className="auth-form__input"
                        id="login"
                        type="text"
                        autoComplete="username"
                    />
                    {errors.login && (
                        <span className="red">{errors.login.message}</span>
                    )}
                </div>
                <div className="auth-form__field">
                    <label htmlFor="password">Пароль</label>
                    <input
                        {...register("password", {
                            required: "Введите ваш пароль",
                        })}
                        className="auth-form__input password hide"
                        id="password"
                        type={isEyeOpened ? "text" : "password"}
                        autoComplete="current-password"
                    />
                    <img
                        onClick={() => setIsEyeOpened(!isEyeOpened)}
                        className={`auth-form__eye ${isEyeOpened && "hidden"}`}
                        width={22}
                        src={eyeClosed}
                        loading="lazy"
                        alt="password hidden"
                        role="button"
                        tabIndex={0}
                    />
                    <img
                        onClick={() => setIsEyeOpened(!isEyeOpened)}
                        className={`auth-form__eye ${!isEyeOpened && "hidden"}`}
                        height={22}
                        src={eyeOpened}
                        loading="lazy"
                        alt="password visible"
                        role="button"
                        tabIndex={0}
                    />
                    {errors.password && (
                        <span className="red">{errors.password.message}</span>
                    )}
                </div>
                <div className="auth-form__field">
                    <ReCAPTCHA
                        className="auth-form__recaptcha"
                        sitekey="6Le-GUYrAAAAANj-_7HXKO_tG9OLAJEZ0Is3-7vv"
                        onChange={onCaptchaChacnge}
                    />
                    {!isRECAPTCHACompleted && isFormSubmitted && (
                        <span className="red">Пройдите reCAPTCHA</span>
                    )}
                </div>
                <div className="auth-form__field">
                    <button
                        onClick={() => setIsFormSubmitted(true)}
                        className="auth-form__submit btn"
                    >
                        Войти
                    </button>
                    <a className="auth-form__forgot-password" href="">
                        Забыли пароль?
                    </a>
                </div>
                <div className="auth-form__field to-register">
                    <span>
                        Ещё нет аккаунта?{" "}
                        <Link
                            to={"/register"}
                            className="auth-form__to-register"
                        >
                            Зарегистрируйтесь
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}
