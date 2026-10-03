import { createContext, useContext } from 'react';
import api from '../config/api';

const AppContext = createContext();

const getErrorMsg = (err,fallback) => err.response?.data?.error || fallback || 'An error occurred';

export const AppProvider = ({ children }) => {
    const {user, setUser} = useState(null);
    // Auth Actions Helper
    const authAction = async (requestFn, successMsg, errorFallback) => {
        try {
            const {data} = await requestFn();
            setUser(data.user);
            if (successMsg) Toast.success(successMsg)
            return true;
        } catch (error) {
            Toast.error(getErrorMsg(error, errorFallback));
            return false;}

    }

    const login = (email, password) => {
        return authAction(() => api.post("/api/auth/login", { email, password }), "Logged in successfully", "Invalid email or password");
    }

    const register = (name, email, password) => {
        return authAction(() => api.post("/api/auth/register", { name, email, password }), "Account created successfully", "Failed to create account");
    }

    const logout = async () => {
        try {
            await api.post("/api/auth/logout");
            setUser(null);
            Toast.success("Logged out successfully");
        } catch (error) {
            Toast.error("Failed to log out");
        }

        const value = {
        user,setUser, login , register , logout
    }
    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
