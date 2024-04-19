import { createContext, useContext, useState } from "react";

const multiStepContext = createContext();

export const useMultiStep = () => {
    const context = useContext(multiStepContext);
    if (!context) {
        throw new Error("multiStepContext must be used within an ResendProvider");
    }
    return context;
};

export const MultiStepProvider = ({ children, steps }) => {
    const INITIAL_DATA = {
        "perfil": {
            "foto": null,
            "nombre": "",
            "subtitulo": "",
            "descripcion": "",
            "fecha_nacimiento": "",
            "contacto": {
                "telefono": "",
                "email": "",
                "direccion": ""
            }
        },
        "habilidades": [],
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
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const updateData = (newData) => {
        console.log(newData)
        setData(prev => {
            return { 
                ...prev, ...newData
                // perfil: { ...prev.perfil, ...newData.perfil },
                // habilidades: newData.habilidades ? newData.habilidades : prev.habilidades
            };
        });
    };

    const next = () => {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i
            return i + 1
        });
    }

    const back = () => {
        setCurrentStepIndex(i => {
            if (i <= 0) return i
            return i - 1
        });
    }

    return (
        <multiStepContext.Provider value={{ data, updateData, next, back, currentStepIndex, step: steps[currentStepIndex], steps }}>
            {children}
        </multiStepContext.Provider>
    )
};

export default multiStepContext;