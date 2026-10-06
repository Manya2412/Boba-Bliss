import { createContext, useContext, useState } from "react";

import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch {
            return null;
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    const saveAuthentication = (authResponse) => {
        const authenticatedUser =
            authResponse.user || {
                id: authResponse.id,
                fullName: authResponse.fullName,
                email: authResponse.email,
                phone: authResponse.phone,
                address: authResponse.address,
                role: authResponse.role,
            };

        localStorage.setItem("token", authResponse.token);

        localStorage.setItem("user", JSON.stringify(authenticatedUser));

        setUser(authenticatedUser);
    };

    const login = async (credentials) => {
        setIsLoading(true);

        try {
            const response = await authService.login(credentials);
            saveAuthentication(response);
            return response;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (registrationData) => {
        setIsLoading(true);

        try {
            const response = await authService.register(registrationData);
            saveAuthentication(response);
            return response;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout API failed", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    const updateUser = (updatedUser) => {
        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: Boolean(user),
                isAdmin: user?.role === "ROLE_ADMIN",
                isLoading,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}