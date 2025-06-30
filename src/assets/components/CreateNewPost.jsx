import "../styles/blocks/CreateNewPost.scss";
import loginSvg from "../images/Header/login.svg";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AutoContext.jsx";
import { Link } from "react-router-dom";
export default function CreateNewPost() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { isAuth,login } = useAuth();
    const publishButtonRef = useRef(null);
    const navigate = useNavigate();
    const publishPost = async (data) => {
        reset();
        const button = publishButtonRef.current;
        button.classList.add("publishing");
        try {
            const response = await axios.post(
                "https://wara-server.onrender.com/api/posts",
                {
                    title: data.title,
                    text: data.textarea,
                    author: login,
                }
            );
            button.classList.remove("publishing");
            navigate("/");
            console.log("✅ Успешно отправлено:", response.data);
        } catch (error) {
            console.log(error);
        }
    };
    if (!isAuth) {
        return (
            <>
                <div className="not-auth centered-text">
                    Вы не вошли в аккаунт
                    <Link className="btn-blue" to={"/login"}>
                        <img width={20} height={20} src={loginSvg} alt="login" />
                        <span>Войти</span>
                    </Link>
                </div>
            </>
        );
    }
    return (
        <section className="new-post container">
            <form
                onSubmit={handleSubmit(publishPost)}
                className="new-post__form centered"
                action=""
            >
                <input
                    className="new-post__title"
                    type="text"
                    {...register("title", {
                        required: "Введите заголовок для вашей публикации",
                        message: "Это поле обязательное",
                    })}
                    placeholder=""
                />
                <span className="new-post__title-placeholder">Title</span>
                {errors.title && (
                    <span className="red">{errors.title.message}</span>
                )}
                <textarea
                    {...register("textarea")}
                    className="new-post__textarea"
                    placeholder="Publication text..."
                    onChange={(event) => {
                        event.target.style.height = "auto";
                        event.target.style.height =
                            event.target.scrollHeight + "px";
                    }}
                ></textarea>
                <div className="new-post__publish-buttons">
                    <button
                        className="new-post__submit btn-blue"
                        type="submit"
                        ref={publishButtonRef}
                    >
                        Publish
                    </button>
                </div>
            </form>
        </section>
    );
}
