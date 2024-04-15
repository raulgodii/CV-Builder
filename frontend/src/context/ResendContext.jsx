import { createContext, useContext } from "react";
import { emailRequest } from '../api/email';

const ResendContext = createContext();

export const useResend = () => {
    const context = useContext(ResendContext);
    if (!context) {
        throw new Error("useResend must be used within an ResendProvider");
    }
    return context;
};

export const ResendProvider = ({ children }) => {

    const sendEmail = async () => {
        const res = await emailRequest();
        console.log(res.data);
    }

    return (
        <ResendContext.Provider value={{ sendEmail }}>
            {children}
        </ResendContext.Provider>
    )
};

export default ResendContext;