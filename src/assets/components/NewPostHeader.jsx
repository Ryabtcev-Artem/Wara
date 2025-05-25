import "../styles/blocks/NewPostHeader.scss";
import useNavigatePrev from "../hooks/useNavigatePrev";
export default function NewPostHeader() {
    const goBack = useNavigatePrev()
    return (
        <header className="new-post-header container">
            <button
                onClick={goBack}
                className="new-post-header__close close-page"
            >
                <span></span>
                <span></span>
            </button>
        </header>
    );
}
