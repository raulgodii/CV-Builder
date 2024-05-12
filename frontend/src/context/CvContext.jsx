import { createContext, useContext, useEffect, useState } from "react";
import { convertRequest, getCvsRequest, createCvRequest, updateCvRequest, deleteCvRequest, getCvRequest } from '../api/cv';

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

    const [data, setData] = useState(TEST_DATA);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [cvId, setCvId] = useState(null);

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

    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        console.log(cvs);
    }, [cvs]);

    const getCvs = async () => {
        const res = await getCvsRequest();
        setCvs(res.data);
    };

    const deleteCv = async (id) => {
        try {
            const res = await deleteCvRequest(id);
            if (res.status === 204) setCvs(cvs.filter((cv) => cv._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createCv = async () => {
        try {
            const res = await createCvRequest({ data: INITIAL_DATA });
            console.log(res)
            setData(res.data.data);
            setCvId(res.data._id);
        } catch (error) {
            console.log(error);
        }
    };

    const getCv = async (id) => {
        try {
            const res = await getCvRequest(id);
            setData(res.data.data);
            setCvId(res.data._id);
        } catch (error) {
            console.error(error);
        }
    };

    const updateCv = async (newCv) => {
        try {
            setData(prev => {
                return {
                    ...prev, ...newCv
                };
            });
            console.log(cvId)
            await updateCvRequest(cvId, {...data, ...newCv});
        } catch (error) {
            console.error(error);
        }
    };

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

    return (
        <CvContext.Provider value={{ data, cvs, cvId, convertContext, getCvs, deleteCv, createCv, getCv, updateCv, updateCv, next, back, currentStepIndex, step: steps[currentStepIndex], steps, deleteData }}>
            {children}
        </CvContext.Provider>
    )
};

export default CvContext;