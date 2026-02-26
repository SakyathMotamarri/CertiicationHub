import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, mockCertifications } from '../data/mockData';

const AuthContext = createContext();
export const CertContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Global certifications state
    const [certs, setCerts] = useState(mockCertifications.filter(c => c.userId === 1));

    useEffect(() => {
        const stored = localStorage.getItem('certihub-user');
        if (stored) {
            setUser(JSON.parse(stored));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email, password, role = 'user') => {
        // Mock auth — any password works; auto-detect admin from email
        const detectedRole = email?.endsWith('@admin.com') ? 'admin' : role;
        const found = mockUsers.find(u => u.role === detectedRole) || mockUsers[0];
        const authUser = { ...found, role: detectedRole, token: `jwt-mock-${Date.now()}` };
        setUser(authUser);
        setIsAuthenticated(true);
        localStorage.setItem('certihub-user', JSON.stringify(authUser));
        return authUser;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('certihub-user');
    };

    const switchRole = (role) => {
        if (user) {
            const updated = { ...user, role };
            setUser(updated);
            localStorage.setItem('certihub-user', JSON.stringify(updated));
        }
    };

    const updateProfile = (updates) => {
        if (user) {
            const updated = { ...user, ...updates };
            setUser(updated);
            localStorage.setItem('certihub-user', JSON.stringify(updated));
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole, updateProfile }}>
            <CertContext.Provider value={{ certs, setCerts }}>
                {children}
            </CertContext.Provider>
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export const useCerts = () => useContext(CertContext);
