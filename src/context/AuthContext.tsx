'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from 'cookies-next';

type AuthContextType = {
    role: string | null;
}

const AuthContext = createContext<AuthContextType>({ role: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const userRole = getCookie('role');
        if (userRole) {
            setRole(userRole as string)
        }
    },[]);

    return (
        <AuthContext.Provider value={{ role }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);