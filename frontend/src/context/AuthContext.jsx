import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, loginGoogleRequest, logoutRequest, verifyTokenRequest } from '../api/auth';
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const registerContext = async (user) => {
        try {
            const res = await registerRequest(user);
            // console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // console.log(error.response)
            setErrors(error.response.data);
            // console.log(errors)
        }
    }

    const loginContext = async (user) => {
        try {
            const res = await loginRequest(user);
            // console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // console.log(error.response)
            setErrors(error.response.data);
        }
    }

    const loginGoogleContext = async (access_token) => {
        try {
            const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            if (response.status === 200) {
                const userData = response.data;
                const res = await loginGoogleRequest({data: userData});
                // console.log(res.data);
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                setErrors('Error en la solicitud de información del usuario');
            }
        } catch (error) {
            // console.log(error.response)
            setErrors(error.response.data);
        }
    }

    const logoutContext = async () => {
        try {
            const res = await logoutRequest();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            // console.log(error.response)
            setErrors(error.response.data);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function verifyToken() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }

        verifyToken();
    }, []);


    return (
        <AuthContext.Provider value={{ registerContext, loginContext, loginGoogleContext, logoutContext, loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;