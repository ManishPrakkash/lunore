import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { toastMessages } from '../utils/toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('lunoré_user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to parse stored user data:', error);
                localStorage.removeItem('lunoré_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Call server API for authentication
            const response = await apiClient.post('/auth/login', {
                email,
                password
            });

            if (response.data.success) {
                const userData = response.data.user;

                // Store user data in localStorage
                localStorage.setItem('lunoré_user', JSON.stringify(userData));
                localStorage.setItem('lunoré_userId', userData.id);  // Store userId for cart operations
                localStorage.setItem('authToken', response.data.token);  // Store JWT token

                setUser(userData);
                setIsAuthenticated(true);

                // Show success toast
                toastMessages.loginSuccess();

                return { success: true, user: userData };
            } else {
                return { success: false, error: response.data.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Invalid email or password'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('lunoré_user');
        localStorage.removeItem('lunoré_userId');  // Clear userId
        localStorage.removeItem('authToken');      // Clear JWT token
        localStorage.removeItem('lunore_cart');
        setUser(null);
        setIsAuthenticated(false);

        // Show logout toast
        toastMessages.logoutSuccess();
    };

    const register = async (name, email, password) => {
        try {
            // Call server API for registration
            const response = await apiClient.post('/auth/register', {
                name,
                email,
                password
            });

            if (response.data.success) {
                const userData = response.data.user;

                // Store user data in localStorage
                localStorage.setItem('lunoré_user', JSON.stringify(userData));
                localStorage.setItem('lunoré_userId', userData.id);
                localStorage.setItem('authToken', response.data.token);  // Store JWT token

                setUser(userData);
                setIsAuthenticated(true);

                // Show success toast
                toastMessages.registrationSuccess();

                return { success: true, user: userData };
            } else {
                return { success: false, error: response.data.message || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed. Please try again.'
            };
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
