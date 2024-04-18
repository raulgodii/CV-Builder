import { createContext, useContext, useState } from "react";

const multiStepContext = createContext();

export const useMultiStep = () => {
    const context = useContext(multiStepContext);
    if (!context) {
        throw new Error("multiStepContext must be used within an ResendProvider");
    }
    return context;
};

export const MultiStepProvider = ({ children }) => {
    const INITIAL_DATA = {
        "perfil": {
            "nombre": "",
            "email": ""
        },
        "habilidades": {
            "habilidad1": "",
            "habilidad2": ""
        },
        "formacion": {
            "titulo": "",
            "institucion": ""
        },
        "experiencia": {
            "empresa": "",
            "puesto": ""
        },
        "idiomas": {
            "idioma1": "",
            "nivel1": ""
        }
    }

    const [data, setData] = useState(INITIAL_DATA);

    const updateData = (newData) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    return (
        <multiStepContext.Provider value={{ data, updateData }}>
            {children}
        </multiStepContext.Provider>
    )
};

export default multiStepContext;