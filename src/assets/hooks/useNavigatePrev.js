import { useNavigate } from "react-router-dom";

export default function useNavigatePrev() {
    const navigate = useNavigate();

    return () => {
        if (window.history.length <= 2) {
            navigate("/");
        } else {
            navigate(-1);
        }
    };
}
