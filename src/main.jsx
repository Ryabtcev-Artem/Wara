import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import NotFound from "./pages/NotFound.jsx";
import NewPost from "./pages/NewPost.jsx";
import Agreement from "./pages/Agreement.jsx";
import ConfirmEmail from "./pages/ConfirmEmail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import { AuthProvider } from "../AutoContext.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "users", element: <Users /> },
            { path: "new-post", element: <NewPost /> },
            { path: "agreement", element: <Agreement /> },
            { path: "confirm-email", element: <ConfirmEmail /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "users/:login", element: <UserProfile /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);
