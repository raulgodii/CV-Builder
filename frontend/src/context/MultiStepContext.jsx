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
            "nombre": "Juan Pérez",
            "subtitulo": "Desarrollador Full Stack",
            "descripcion": "Apasionado por la tecnología y el desarrollo de software.",
            "fecha_nacimiento": "1990-05-15",
            "contacto": {
                "telefono": "+1234567890",
                "email": "juan@example.com",
                "direccion": "Calle Ficticia, 123, Ciudad Ficticia"
            }
        },
        "habilidades": [
            {
                "titulo": "Desarrollo web",
                "puntuacion": "Avanzado"
            },
            {
                "titulo": "Programación en JavaScript",
                "puntuacion": "Avanzado"
            },
            {
                "titulo": "Gestión de bases de datos",
                "puntuacion": "Intermedio"
            }
        ],
        "formacion": [
            {
                "titulo": "Ingeniería Informática",
                "fecha": "2010-2014",
                "lugar": "Universidad Ficticia"
            },
            {
                "titulo": "Curso de Desarrollo Web",
                "fecha": "2015",
                "lugar": "Centro de Formación Ficticio"
            },
            {
                "titulo": "Curso de Programación en JavaScript",
                "fecha": "2016",
                "lugar": "Plataforma de Aprendizaje Online"
            }
        ],
        "experiencia": [
            {
                "titulo": "Desarrollador Web",
                "fecha": "2016-2020",
                "lugar": "Empresa de Desarrollo Tecnológico"
            },
            {
                "titulo": "Ingeniero de Software",
                "fecha": "2020-actualidad",
                "lugar": "Empresa de Software Innovador"
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

    const [data, setData] = useState(INITIAL_DATA);
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