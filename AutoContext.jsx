import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authData, setAuthData] = useState({
        isAuth: false,
        login: null,
        createdAt: null,
    });

    const checkAuth = useCallback(async () => {
        try {
            const response = await axios.get("https://wara-server.onrender.com/api/check-auth", {
                withCredentials: true,
            });
            setAuthData(response.data);
        } catch (error) {
            setAuthData({ isAuth: false, login: null, createdAt: null });
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <AuthContext.Provider value={{ ...authData, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
