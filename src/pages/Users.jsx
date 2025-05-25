import { useEffect, useState } from "react";
import usePageTitle from "../assets/hooks/usePageTitle";
import profileSvg from "../assets/images/Profile/profile.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles/pages/UserPreviews.scss";
export default function Users() {
    usePageTitle("Wara Пользователи");
    const [allUsers, setAllUsers] = useState(null);
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(
                    "https://wara-server.up.railway.app/api/users"
                );
                const users = response.data;
                setAllUsers(users);
            } catch (err) {
                console.log(err);
            }
        };
        getAllUsers();
    }, []);
    if (!allUsers) {
        return <p className="centered-text">Пользователи загружаются...</p>;
    }
    return (
        <section className="user-previews centered container">
            {allUsers.map((user, index) => {
                return (
                    <div key={index} className="user-previews__preview">
                        <Link
                            className="user-previews__to-user"
                            to={`/users/${user.login}`}
                        >
                            <img
                                src={profileSvg}
                                alt="user avatar"
                                height={20}
                                width={20}
                            />
                            <h2 className="user-previews__username">
                                {user.login}
                            </h2>
                        </Link>
                    </div>
                );
            })}
        </section>
    );
}
