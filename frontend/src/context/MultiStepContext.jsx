import { createContext, useContext, useState } from "react";
import { updateCvRequest } from '../api/auth';

const multiStepContext = createContext();

export const useMultiStep = () => {
    const context = useContext(multiStepContext);
    if (!context) {
        throw new Error("multiStepContext must be used within an MultiStepContext");
    }
    return context;
};

export const MultiStepProvider = ({ children, steps }) => {
    const INITIAL_DATA = {
        "perfil": {
            "foto": null,
            "nombre": "",
            "primer_apellido": "",
            "profesion": "",
            "descripcion": "",
            "fecha_nacimiento": "",
            "contacto": {
                "telefono": "",
                "email": "",
                "direccion": ""
            }
        },
        "habilidades": [],
        "formacion": [],
        "experiencia": [],
        "idiomas": []
    }

    const TEST_DATA = {
        "perfil": {
            "foto": null,
            "nombre": "d",
            "primer_apellido": "d",
            "profesion": "d",
            "descripcion": "d",
            "fecha_nacimiento": "2024-05-16",
            "contacto": {
                "telefono": "666666666",
                "email": "test@test.com",
                "direccion": "test"
            }
        },
        "habilidades": [],
        "formacion": [],
        "experiencia": [],
        "idiomas": []
    }

    const [data, setData] = useState(TEST_DATA);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const updateData = async (newData) => {
        console.log(newData)
        setData(prev => {
            return {
                ...prev, ...newData
            };
        });

        try {
            const res = await updateCvRequest({
                data: {
                    ...data, ...newData
                }
            });
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    };

    const deleteData = () => {
        setData(INITIAL_DATA);
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
        <multiStepContext.Provider value={{ data, updateData, next, back, currentStepIndex, step: steps[currentStepIndex], steps, deleteData }}>
            {children}
        </multiStepContext.Provider>
    )
};

export default multiStepContext;