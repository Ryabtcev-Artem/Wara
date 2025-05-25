import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useState } from "react";
import eyeClosed from "../images/LoginForm/eye-closed.svg";
import eyeOpened from "../images/LoginForm/eye-opened.svg";
import { Link } from "react-router-dom";
import "../styles/blocks/RegisterForm.scss";
import { useNavigate } from "react-router-dom";
import useNavigetePrev from "../hooks/useNavigatePrev";
export default function RegisterForm() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [isEyeOpened, setIsEyeOpened] = useState(false);
    const [isRECAPTCHACompleted, setIsRECAPTCHACompleted] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const goBack = useNavigetePrev();
    const onSubmit = async (data) => {
        if (!isRECAPTCHACompleted) {
            return;
        }
        const normalizedEmail = data.email.toLowerCase().trim();
        const normalizedLogin = data.login.toLowerCase().trim();
        const response = await axios.get("https://wara-server.up.railway.app/api/users");
        const allUsers = response.data;

        for (let user of allUsers) {
            if (user.email === normalizedEmail) {
                setError("email", {
                    type: "manual",
                    message: "Этот Email уже используется",
                });
                return;
            }
            if (user.login === normalizedLogin) {
                setError("login", {
                    type: "manual",
                    message: "Этот Логин уже занят",
                });
                return;
            }
        }
        const sendCode = await axios.post(
            "https://wara-server.up.railway.app/api/send-email",
            { email: normalizedEmail }
        );
        const result = sendCode.data;
        if (!result.success) {
            return;
        }
        navigate("/confirm-email", {
            state: {
                email: normalizedEmail,
                login: data.login,
                password: data.password,
                code: result.code,
            },
        });
        reset();
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
                    onClick={goBack}
                    type="button"
                    className="auth-form__close close-page"
                >
                    <span></span>
                    <span></span>
                </Link>
                <h2>Регистрация</h2>
                <div className="auth-form__field">
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email", {
                            required: "Введите ваш email",
                        })}
                        className="auth-form__input"
                        id="email"
                        type="email"
                        autoComplete="email"
                    />
                    {errors.email && (
                        <span className="red">{errors.email.message}</span>
                    )}
                </div>
                <div className="auth-form__field">
                    <label htmlFor="login">Логин</label>
                    <input
                        {...register("login", {
                            required: "Введите ваш логин",
                            maxLength: {
                                value: 16,
                                message: "Максимум 16 символов",
                            },
                            pattern: {
                                value: /^[^\s]{1,16}$/, 
                                message: "Логин не должен содержать пробелы",
                            },
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
                <div className="auth-form__field register-agree">
                    <input
                        {...register("register-agree")}
                        type="checkbox"
                        required
                        className="auth-form__register-agree"
                    />
                    <span>
                        Я принимаю условия{" "}
                        <Link
                            className="normal-link"
                            onClick={() =>
                                localStorage.setItem("register", true)
                            }
                            to="/agreement"
                        >
                            Пользовательского соглашения
                        </Link>
                    </span>
                </div>
                <div className="auth-form__field">
                    <ReCAPTCHA
                        className="auth-form__recaptcha"
                        sitekey="6LdllUgrAAAAABJUe6-1Pz-4FNpfaziCMf6Z3_uQ"
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
                        Регистрация
                    </button>
                </div>
                <div className="auth-form__field to-register">
                    <span>
                        Уже зарегистрированы?{" "}
                        <Link
                            to={"/login"}
                            type="button"
                            className="auth-form__to-register"
                        >
                            Войдите
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}
