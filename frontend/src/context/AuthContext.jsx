import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest, verifyTokenRequest, convertRequest } from '../api/auth';
import Cookies from "js-cookie";

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
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data);
        }
    }

    const loginContext = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data);
        }
    }

    const logoutContext = async () => {
        try {
            const res = await logoutRequest();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.log(error.response)
            // setErrors(error.response.data);
        }
    }

    const convertContext = async (html) => {
        try {
            const res = await convertRequest(html);

            const file = new Blob([res.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = 'generated_pdf.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(fileURL);
        } catch (error) {
            console.log(error)
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
        <AuthContext.Provider value={{ registerContext, loginContext, logoutContext, convertContext, loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;