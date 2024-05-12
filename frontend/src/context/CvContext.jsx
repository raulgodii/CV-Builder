import { createContext, useContext, useState } from "react";
import { updateCvRequest } from '../api/auth';

const CvContext = createContext();

export const useCv = () => {
    const context = useContext(CvContext);
    if (!context) {
        throw new Error("CvContext must be used within an CvContext");
    }
    return context;
};

export const CvProvider = ({ children, steps }) => {
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
            "foto": "https://example.com/profile.jpg",
            "nombre": "Juan",
            "primer_apellido": "Pérez",
            "profesion": "Desarrollador de Software",
            "descripcion": "Soy un apasionado desarrollador de software con experiencia en desarrollo web y móvil.",
            "fecha_nacimiento": "1990-05-16",
            "contacto": {
                "telefono": "123456789",
                "email": "juan@example.com",
                "direccion": "Calle Principal, Ciudad, País"
            }
        },
        "habilidades": [
            {
                "titulo": "JavaScript",
                "puntuacion": "90"
            },
            {
                "titulo": "React",
                "puntuacion": "85"
            }
        ],
        "formacion": [
            {
                "titulo": "Ingeniería Informática",
                "fecha": "2010-2014",
                "lugar": "Universidad X"
            },
            {
                "titulo": "Curso de Desarrollo Web",
                "fecha": "2015",
                "lugar": "Plataforma de Aprendizaje Y"
            }
        ],
        "experiencia": [
            {
                "titulo": "Desarrollador Full Stack",
                "fecha": "2015-2020",
                "lugar": "Empresa Z"
            },
            {
                "titulo": "Desarrollador Frontend",
                "fecha": "2020-Presente",
                "lugar": "Startup A"
            }
        ],
        "idiomas": [
            {
                "titulo": "Inglés",
                "nivel": "Avanzado"
            },
            {
                "titulo": "Francés",
                "nivel": "Intermedio"
            }
        ]
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
        <CvContext.Provider value={{ data, updateData, next, back, currentStepIndex, step: steps[currentStepIndex], steps, deleteData }}>
            {children}
        </CvContext.Provider>
    )
};

export default CvContext;