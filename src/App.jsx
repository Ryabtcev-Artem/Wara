import "./App.scss";
import Header from "./assets/components/Header";
import { Outlet, useLocation } from "react-router-dom";
export default function App() {
    const location = useLocation()
    const hideHeaderRoutes = ["/new-post","/agreement", "/login","/register","/confirm-email"]
    const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname)
    return (
        <>
            {shouldShowHeader && <Header />}
            <main>
                <Outlet />
            </main>
        </>
    );
}
