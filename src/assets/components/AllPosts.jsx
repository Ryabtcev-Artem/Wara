import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/blocks/preview-post.scss";
import profileSvg from "../images/Profile/profile.svg";
import { Link } from "react-router-dom";
export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    async function getData() {
        try {
            const postsData = await axios.get(
                "https://wara-server.up.railway.app/api/posts"
            );
            setPosts(postsData.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);
    const formatPostDate = (date) => {
        const now = new Date();
        const strDate = new Date(date);
        const diffMins = Math.floor((now - strDate) / 1000 / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        const pluralize = (number, [one, few, many]) => {
            const mod10 = number % 10;
            const mod100 = number % 100;
            if (mod10 === 1 && mod100 !== 11) return one;
            if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
                return few;
            return many;
        };
        if (diffMins < 1){
            return 'только что'
        }
        if (diffMins < 60) {
            return `${diffMins} ${pluralize(diffMins, [
                "минута",
                "минуты",
                "минут",
            ])} назад`;
        } else if (diffHours < 24) {
            return `${diffHours} ${pluralize(diffHours, [
                "час",
                "часа",
                "часов",
            ])} назад`;
        } else {
            return `${diffDays} ${pluralize(diffDays, [
                "день",
                "дня",
                "дней",
            ])} назад`;
        }
    };

    return (
        <section className="all-posts">
            {posts.length === 0 ? (
                <p className="centered-text">Посты загружаются...</p>
            ) : (
                posts.map((post, index) => (
                    <div
                        className="preview-post container centered"
                        key={index - 1}
                    >
                        <div className="preview-post-wrapper">
                            <div className="preview-post__top">
                                <Link
                                    className="preview-post__to-user"
                                    to={`/users/${post.author}`}
                                >
                                    <img
                                        className="preview-post__avatar"
                                        src={profileSvg}
                                        width={20}
                                        height={20}
                                        alt="user avatar"
                                    />
                                    <span className="preview-post__username">
                                        {post.author}
                                    </span>
                                </Link>

                                <span>{formatPostDate(post.createdAt)}</span>
                            </div>
                            <h3 className="preview-post__title" key={index}>
                                {post.title}
                            </h3>
                            <p
                                className="preview-post__description"
                                key={index + 1}
                            >
                                {post.text}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}
