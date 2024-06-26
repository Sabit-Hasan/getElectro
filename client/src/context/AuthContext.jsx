import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const storedData = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if (storedData) {
            const { newToken, newData } = storedData;
            setToken(newToken);
            setUserData(newData);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (newToken, newData) => {
        localStorage.setItem("token", JSON.stringify({
            newToken, newData
        }));

        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserData({});
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ token, userData, setUserData, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node
};