import writeSvg from "../images/CreatePost/write.svg";
import "../styles/blocks/CreatePost.scss";

import { Link } from "react-router-dom";
export default function CreatePost() {
    return (
        <section className="create-post container centered">
            <Link to="/new-post" className="create-post__button container">
                <img
                    width={20}
                    height={20}
                    loading="lazy"
                    src={writeSvg}
                    alt="write post "
                />
                <p>Создать пост</p>
            </Link>
        </section>
    );
}
