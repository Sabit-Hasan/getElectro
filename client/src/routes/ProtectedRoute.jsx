import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
    const { isAuthenticated, userData } = useContext(AuthContext);
    const isLoggedIn = isAuthenticated;

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children
}

export default ProtectedRoute;