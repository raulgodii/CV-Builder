import { createContext, useContext, useEffect, useState } from "react";
import { convertRequest, convertImageRequest, getCvsRequest, createCvRequest, updateCvRequest, deleteCvRequest, getCvRequest, uploadFotoRequest, loadFileRequest, deleteFotoRequest } from '../api/cv';

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
            },
            {
                "titulo": "Node.js",
                "puntuacion": "80"
            },
            {
                "titulo": "Python",
                "puntuacion": "75"
            },
            {
                "titulo": "SQL",
                "puntuacion": "85"
            },
            {
                "titulo": "HTML/CSS",
                "puntuacion": "95"
            },
            {
                "titulo": "Git",
                "puntuacion": "88"
            },
            {
                "titulo": "Docker",
                "puntuacion": "70"
            },
            {
                "titulo": "AWS",
                "puntuacion": "65"
            },
            {
                "titulo": "TypeScript",
                "puntuacion": "80"
            },
            {
                "titulo": "Vue.js",
                "puntuacion": "78"
            }
        ],
        "formacion": [
            {
                "titulo": "Ingeniería Informática",
                "fecha_inicio": "2010-09-01",
                "fecha_fin": "2015-06-15",
                "actualidad": false,
                "lugar": "Universidad X"
            },
            {
                "titulo": "Curso de Desarrollo Web",
                "fecha_inicio": "2019-01-10",
                "fecha_fin": "2019-06-20",
                "actualidad": false,
                "lugar": "Plataforma de Aprendizaje Y"
            },
            {
                "titulo": "Máster en Inteligencia Artificial",
                "fecha_inicio": "2016-09-01",
                "fecha_fin": "2018-06-30",
                "actualidad": false,
                "lugar": "Universidad Z"
            },
            {
                "titulo": "Certificación en AWS",
                "fecha_inicio": "2020-02-01",
                "fecha_fin": "2020-04-01",
                "actualidad": false,
                "lugar": "AWS Training Center"
            }
        ],
        "experiencia": [
            {
                "titulo": "Desarrollador Full Stack",
                "fecha_inicio": "2021-01-15",
                "fecha_fin": "2023-05-10",
                "actualidad": false,
                "lugar": "Empresa Z"
            },
            {
                "titulo": "Desarrollador Frontend",
                "fecha_inicio": "2019-06-01",
                "fecha_fin": "2020-12-31",
                "actualidad": false,
                "lugar": "Startup A"
            },
            {
                "titulo": "Ingeniero de Software",
                "fecha_inicio": "2015-09-01",
                "fecha_fin": "2019-05-30",
                "actualidad": false,
                "lugar": "Corporación B"
            },
            {
                "titulo": "Desarrollador Backend",
                "fecha_inicio": "2023-06-01",
                "fecha_fin": "Actualidad",
                "actualidad": true,
                "lugar": "Empresa Tech C"
            },
            {
                "titulo": "Analista de Datos",
                "fecha_inicio": "2013-06-01",
                "fecha_fin": "2015-08-31",
                "actualidad": false,
                "lugar": "Consultora D"
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
            },
            {
                "titulo": "Alemán",
                "nivel": "Básico"
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
            a.download = 'cv.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(fileURL);
        } catch (error) {
            // console.log(error)
        }
    }

    const convertImageContext = (html) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await convertImageRequest(html);

                if (res.status === 200) {
                    const imageBlob = res.data;
                    // console.log("aqui tambien")
                    const reader = new FileReader();
                    reader.onload = function () {
                        const base64Data = reader.result;

                        resolve(base64Data);
                    };
                    reader.readAsDataURL(imageBlob);
                } else {
                    // console.error('Error al obtener la imagen PNG.');
                    reject('Error al obtener la imagen PNG.');
                }
            } catch (error) {
                // console.error(error);
                reject(error);
            }
        });
    };

    const [data, setData] = useState(null);
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

    const start = () => {
        setCurrentStepIndex(0);
    }

    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        // console.log(cvs);
    }, [cvs]);

    useEffect(() => {
        // console.log(data);
    }, [data]);

    const getCvs = async () => {
        const res = await getCvsRequest();
        setCvs(res.data);
    };

    const deleteCv = async (id) => {
        try {
            const res = await deleteCvRequest(id);
            if (res.status === 204) setCvs(cvs.filter((cv) => cv._id !== id));
        } catch (error) {
            // console.log(error);
        }
    };

    const createCv = async () => {
        try {
            const res = await createCvRequest({ data: TEST_DATA });
            // console.log(res)
            setData(res.data.data);
            setCvId(res.data._id);

            return res.data._id;
        } catch (error) {
            throw error;
            // console.log(error);
        }
    };

    const getCv = async (id) => {
        try {
            const res = await getCvRequest(id);
            setData(res.data.data);
            setCvId(res.data._id);

            // console.log(res.data.data)
        } catch (error) {
            // console.error(error);
            throw error;
        }
    };

    const updateCv = async (newCv) => {
        try {
            setData(prev => {
                return {
                    ...prev, ...newCv
                };
            });
            await updateCvRequest(cvId, { data: { ...data, ...newCv } });
        } catch (error) {
            // console.error(error);
        }
    };

    const uploadFoto = async (foto) => {
        try {
            const formData = new FormData();
            formData.append('foto', foto);

            const response = await uploadFotoRequest(cvId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            // console.error('Error al subir la foto: ', error);
        }
    };

    const deleteFoto = async (foto) => {
        try {
            const response = await deleteFotoRequest(cvId, { data: { foto } }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            // console.error('Error al eliminar la foto: ', error);
        }
    };

    const loadFoto = async (foto) => {
        try {
            const response = await loadFileRequest(foto);
            //console.log(response)

            return response.data;
        } catch (error) {
            // console.error('Error al cargar la foto: ', error);
        }
    };

    // const updateData = async (newData) => {
    //     console.log(newData)
    //     setData(prev => {
    //         return {
    //             ...prev, ...newData
    //         };
    //     });

    //     try {
    //         const res = await updateCvRequest({
    //             data: {
    //                 ...data, ...newData
    //             }
    //         });
    //         console.log(res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    return (
        <CvContext.Provider value={{ data, cvs, cvId, uploadFoto, deleteFoto, loadFoto, convertContext, convertImageContext, getCvs, deleteCv, createCv, getCv, updateCv, updateCv, start, next, back, currentStepIndex, step: steps[currentStepIndex], steps, deleteData }}>
            {children}
        </CvContext.Provider>
    )
};

export default CvContext;