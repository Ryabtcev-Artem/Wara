import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import usePageTitle from "../assets/hooks/usePageTitle";
import profileSvg from "../assets/images/Profile/profile.svg";
import "../assets/styles/pages/UserProfile.scss";
import { useAuth } from "../../AutoContext";
export default function UserProfile() {
    const authData = useAuth();
    const { checkAuth } = useAuth();
    const { login } = useParams();
    const [isUserPage, setIsUserPage] = useState(false);
    if (authData.isAuth && isUserPage !== true) {
        if (
            authData.login.toLowerCase().trim() === login.toLowerCase().trim()
        ) {
            setIsUserPage(true);
        }
    }
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const logout = async () => {
        try {
            await axios.post(
                "https://wara-server.up.railway.app/api/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            await checkAuth();
            navigate("/");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `https://wara-server.up.railway.app/api/users`
                );
                const allUsers = response.data;
                const normalizedLogin = login.toLowerCase().trim();
                for (let user of allUsers) {
                    if (user.login.toLowerCase().trim() === normalizedLogin) {
                        setUser(user);
                        setLoading(false);
                        return;
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Ошибка загрузки пользователя:", error);
                setLoading(false);
            }
        };
        fetchUser();
    }, [login]);

    usePageTitle(`${login} - / Wara`);
    if (loading) return <p className="centered-text">Загрузка...</p>;
    if (!user) return <p className="centered-text">Пользователь не найден</p>;

    const date = new Date(user.createdAt);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}:${String(
        date.getMonth() + 1
    ).padStart(2, "0")}:${date.getFullYear()}`;

    return (
        <section className="user-profile container centered">
            <div className="user-profile-wrapper">
                <img
                    src={profileSvg}
                    width={60}
                    height={60}
                    loading="lazy"
                    alt="user avatar"
                />
                <h1>{user.login}</h1>
                <p>Пользователь</p>
                <p>Зарегистрирован {formattedDate}</p>
                {isUserPage && (
                    <button
                        onClick={()=>{logout()}}
                        className="user-profile__logout btn-blue"
                    >
                        Выйти
                    </button>
                )}
            </div>
        </section>
    );
}
