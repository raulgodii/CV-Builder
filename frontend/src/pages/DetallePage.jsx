import ViewCV from "../components/ViewCV";
import ReactDOMServer from "react-dom/server";
import { useCv } from "../context/CvContext";
import { Tooltip } from 'react-tooltip';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

function DetallePage() {
    const { data, convertContext, convertImageContext, getCv, loadFoto } = useCv();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [cvImage, setCvImage] = useState(null);
    const [downloadModal, setDownloadModal] = useState(false);
    const navigate = useNavigate();

    const [fotoPerfil, setfotoPerfil] = useState("/images/loader2.gif");

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getCv(id);
                setLoading(false);
            } catch (error) {
                // console.log(error);
                setLoading(false);
                navigate('/404');
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {

        const generateImg = async () => {
            data.experiencia?.sort(compareDates);
            data.formacion?.sort(compareDates);

            if (perfilCompletado(data.perfil) && (validateCurriculum().length === 0)) {
                const base64Image = await fetchImageAsBase64();
                const cvHTML = ReactDOMServer.renderToString(<ViewCV data={data} base64Image={base64Image} />);
                convertImageContext({ html: cvHTML })
                    .then(image => {
                        setCvImage(image);
                    })
                    .catch(error => {
                        // console.error('Error al convertir la imagen:', error);
                    });
            }
        }

        const getFoto = async () => {
            try {
                const blob = await loadFoto(data.perfil.foto);
                const url = URL.createObjectURL(blob);
                setfotoPerfil(url);
            } catch (error) {
                setfotoPerfil("/images/no-image.png");
            }
        }

        if (data) {
            generateImg();
            getFoto();
        }
    }, [data]);

    const openModal = () => {
        setDownloadModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setDownloadModal(false);
        document.body.style.overflow = '';
    };

    const compareDates = (a, b) => {
        if (a.actualidad && !b.actualidad) {
            return -1;
        }
        if (!a.actualidad && b.actualidad) {
            return 1;
        }
        const dateA = new Date(a.fecha_fin);
        const dateB = new Date(b.fecha_fin);
        return dateB - dateA;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchImageAsBase64 = async () => {
        if (data.perfil.foto) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cv/files/${data.perfil.foto}`, {
                    responseType: 'blob',
                });

                return new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        const base64Result = reader.result;
                        resolve(`${base64Result}`);
                    };

                    reader.onerror = reject;

                    reader.readAsDataURL(response.data);
                });
            } catch (error) {
                // console.error('Error al cargar la imagen y convertirla a base64:', error);
                throw error;
            }
        }
    };

    const handleDownloadPDF = async () => {
        const base64Image = await fetchImageAsBase64();
        // console.log(base64Image)
        const cvHTML = ReactDOMServer.renderToString(<ViewCV data={data} base64Image={base64Image} />);
        convertContext({ html: cvHTML });
    };

    const perfilCompletado = (perfil) => {
        if (
            !perfil.nombre ||
            !perfil.primer_apellido ||
            !perfil.profesion ||
            !perfil.descripcion ||
            !perfil.fecha_nacimiento ||
            !perfil.contacto ||
            !perfil.contacto.telefono ||
            !perfil.contacto.email ||
            !perfil.contacto.direccion
        ) {
            return false;
        }
        return true;
    }

    const habilidadesCompletadas = (habilidades) => {
        if (!Array.isArray(habilidades) || habilidades.length === 0) {
            return false;
        }
        for (let habilidad of habilidades) {
            if (!habilidad.titulo || !habilidad.puntuacion) {
                return false;
            }
        }
        return true;
    }

    const formacionCompletada = (formacion) => {
        if (!Array.isArray(formacion) || formacion.length === 0) {
            return false;
        }
        for (let form of formacion) {
            if (!form.titulo || !form.fecha_inicio || (!form.fecha_fin && !form.actualidad) || !form.lugar) {
                return false;
            }
        }
        return true;
    }

    const experienciaCompletada = (experiencia) => {
        if (!Array.isArray(experiencia) || experiencia.length === 0) {
            return false;
        }
        for (let exp of experiencia) {
            if (!exp.titulo || !exp.fecha_inicio || (!exp.fecha_fin && !exp.actualidad) || !exp.lugar) {
                return false;
            }
        }
        return true;
    }

    const idiomasCompletados = (idiomas) => {
        if (!Array.isArray(idiomas) || idiomas.length === 0) {
            return false;
        }
        for (let idioma of idiomas) {
            if (!idioma.titulo || !idioma.nivel) {
                return false;
            }
        }
        return true;
    }

    const todasSeccionesCompletadas = (data) => {
        return perfilCompletado(data.perfil) &&
            habilidadesCompletadas(data.habilidades) &&
            formacionCompletada(data.formacion) &&
            experienciaCompletada(data.experiencia) &&
            idiomasCompletados(data.idiomas);
    };

    const validateCurriculum = () => {
        const missingData = {};

        // Validar el perfil
        if (!data.perfil || Object.keys(data.perfil).some(key => key !== 'foto' && !data.perfil[key])) {
            missingData['perfil'] = true;
        }

        // Validar habilidades
        data.habilidades?.forEach(habilidad => {
            if (!habilidad.titulo || !habilidad.puntuacion) {
                missingData['habilidades'] = true;
            }
        });

        // Validar formación
        data.formacion?.forEach(formacion => {
            if (!formacion.titulo || !formacion.fecha_inicio || (!formacion.fecha_fin && !formacion.actualidad) || !formacion.lugar) {
                missingData['formacion'] = true;
            }
        });

        // Validar experiencia
        data.experiencia?.forEach(experiencia => {
            if (!experiencia.titulo || !experiencia.fecha_inicio || (!experiencia.fecha_fin && !experiencia.actualidad) || !experiencia.lugar) {
                missingData['experiencia'] = true;
            }
        });

        // Validar idiomas
        data.idiomas?.forEach(idioma => {
            if (!idioma.titulo || !idioma.nivel) {
                missingData['idiomas'] = true;
            }
        });

        return Object.keys(missingData);
    };


    return (
        <>
            {loading ? <div class="page-loader"></div> :

                <>
                    {/* <section className="ipad-top-space-margin md-h-850px bg-very-light-gray">
                        <section className="bg-extra-dark-slate-blue">
                            <div className="container">
                                <div className="row mb-1">
                                    <div className="col-12 text-center appear anime-child anime-complete">
                                        <h2 className="alt-font text-white text-uppercase fw-700">Detalle del CV</h2>
                                    </div>
                                </div>
                                <div className="row justify-content-center appear anime-child anime-complete">

                                    <div className="col-12 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                                        <div className="row align-items-center">
                                            <div className="col-12 btn-dual text-center">
                                                <button data-tooltip-id="download-tooltip" onClick={handleDownloadPDF} class="btn btn-large text-white btn-hover-animation-switch btn-icon-left d-table d-lg-inline-block lg-mb-15px md-mx-auto">
                                                    <span>
                                                        <span class="btn-text">Descargar CV</span>
                                                        <span class="btn-icon"><i class="fa-solid fa-download"></i></span>
                                                        <span class="btn-icon"><i class="fa-solid fa-download"></i></span>
                                                    </span>
                                                </button>
                                                <Tooltip id="download-tooltip" className='tooltip text-start'>
                                                    <span className="fw-700 fs-17 text-white">Descargar (PDF)</span>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </div>
                        </section>
                    </section> */}
                    <section class="ipad-top-space-margin md-pt-0 pb-0">
                        <div class="container">
                            <div class="row align-items-center justify-content-center">
                                <div class="col-12 col-xl-6 col-lg-8 text-center position-relative page-title-double-large">
                                    <div class="d-flex flex-column justify-content-center extra-very-small-screen">
                                        <h1 class="text-white alt-font ls-minus-1px fw-700 mb-20px">Detalles del CV</h1>
                                        <h2 class="text-white d-inline-block fw-400 ls-0px mb-0">Estos son los detalles de tu CV</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="pt-0 pb-0 overflow-hidden">
                        <div class="bg-black p-3 md-p-6 sm-p-10 position-relative overflow-hidden">
                            <div class="row justify-content-center mb-5">
                                <div class="col-lg-8 text-center appear anime-child anime-complete" >
                                    <h2 class="text-white fw-600 ls-minus-1px z-index-1 position-relative" >Registro de datos</h2>
                                </div>
                            </div>
                            <div class="row row-cols-1 row-cols-md-6 justify-content-center appear anime-child anime-complete">

                                <div class="col text-center last-paragraph-no-margin process-step-style-02 sm-mb-40px" >
                                    <div class="process-step-icon-box position-relative mb-25px">
                                        <span class="progress-step-separator bg-white w-70 separator-line-1px opacity-2"></span>
                                        <div className={`process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-80px w-80px fs-20 box-shadow-large text-dark-gray fw-500 ${perfilCompletado(data.perfil) ? 'bg-green' : 'bg-red'}`}>
                                            <span class="fw-600 number position-relative z-index-1">01</span>
                                            <div class="box-overlay bg-base-color rounded-circle"></div>
                                        </div>
                                    </div>
                                    <span class="d-block fs-17 fw-500 text-white mb-5px">Perfil</span>
                                </div>

                                <div class="col text-center last-paragraph-no-margin process-step-style-02 sm-mb-40px" >
                                    <div class="process-step-icon-box position-relative mb-25px">
                                        <span class="progress-step-separator bg-white w-70 separator-line-1px opacity-2"></span>
                                        <div className={`process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-80px w-80px fs-20 box-shadow-large text-dark-gray fw-500 ${habilidadesCompletadas(data.habilidades) ? 'bg-green' : 'bg-red'}`}>
                                            <span class="fw-600 number position-relative z-index-1">02</span>
                                            <div class="box-overlay bg-base-color rounded-circle"></div>
                                        </div>
                                    </div>
                                    <span class="d-block fs-17 fw-500 text-white mb-5px">Habilidades</span>
                                </div>

                                <div class="col text-center last-paragraph-no-margin process-step-style-02 sm-mb-40px" >
                                    <div class="process-step-icon-box position-relative mb-25px">
                                        <span class="progress-step-separator bg-white w-70 separator-line-1px opacity-2"></span>
                                        <div className={`process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-80px w-80px fs-20 box-shadow-large text-dark-gray fw-500 ${formacionCompletada(data.formacion) ? 'bg-green' : 'bg-red'}`}>
                                            <span class="fw-600 number position-relative z-index-1">03</span>
                                            <div class="box-overlay bg-base-color rounded-circle"></div>
                                        </div>
                                    </div>
                                    <span class="d-block fs-17 fw-500 text-white mb-5px">Formación</span>
                                </div>

                                <div class="col text-center last-paragraph-no-margin process-step-style-02 sm-mb-40px" >
                                    <div class="process-step-icon-box position-relative mb-25px">
                                        <span class="progress-step-separator bg-white w-70 separator-line-1px opacity-2"></span>
                                        <div className={`process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-80px w-80px fs-20 box-shadow-large text-dark-gray fw-500 ${formacionCompletada(data.formacion) ? 'bg-green' : 'bg-red'}`}>
                                            <span class="fw-600 number position-relative z-index-1">04</span>
                                            <div class="box-overlay bg-base-color rounded-circle"></div>
                                        </div>
                                    </div>
                                    <span class="d-block fs-17 fw-500 text-white mb-5px">Experiencia</span>
                                </div>

                                <div class="col text-center last-paragraph-no-margin process-step-style-02" >
                                    <div class="process-step-icon-box position-relative mb-25px">
                                        <span class="progress-step-separator bg-white w-70 separator-line-1px opacity-2 d-md-none"></span>
                                        <div className={`process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-80px w-80px fs-20 box-shadow-large text-dark-gray fw-500 ${idiomasCompletados(data.idiomas) ? 'bg-green' : 'bg-red'}`}>
                                            <span class="fw-600 number position-relative z-index-1">05</span>
                                            <div class="box-overlay bg-base-color rounded-circle"></div>
                                        </div>
                                    </div>
                                    <span class="d-block fs-17 fw-500 text-white mb-5px">Idiomas</span>
                                </div>

                            </div>

                            <div class="position-absolute top-5px ls-minus-6px left-0px w-100 text-center skrollable skrollable-between" data-bottom-top="transform: translate3d(380px, 0px, 0px);" data-top-bottom="transform: translate3d(-380px, 0px, 0px);">
                                <div class="fs-200 md-fs-170 xs-fs-110 fw-700 opacity-1">datos</div>
                            </div>

                            <div className="row justify-content-center mt-3">
                                <div className="col-lg-8 text-center appear anime-child anime-complete">
                                    <h6 className={`fw-600 ls-minus-1px z-index-1 position-relative ${todasSeccionesCompletadas(data) ? 'text-success' : 'text-danger'}`}>
                                        {todasSeccionesCompletadas(data) ? 'Datos completados' : 'Faltan datos por completar'}
                                    </h6>
                                </div>
                            </div>

                            {
                                perfilCompletado(data.perfil) ? <></> :
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8 text-center">
                                            <p className={`fw-600 ls-minus-1px z-index-1 position-relative text-danger`}>
                                                Completa al menos los datos de perfil para poder descargar tu CV
                                            </p>
                                        </div>
                                    </div>
                            }

                            <div className="row justify-content-center mt-1">
                                <div className="col-lg-8 text-center appear anime-child anime-complete">
                                    <Link to={"/modificar/" + id} class="btn btn-medium btn-transparent-white btn-slide-up d-table d-lg-inline-block lg-mb-15px md-mx-auto">Modificar<span class="bg-white"></span></Link>
                                </div>
                            </div>

                        </div>
                    </section>

                    {
                        perfilCompletado(data.perfil) ?
                            (validateCurriculum().length === 0) ?
                                <section class="bg-black py-0 overflow-hidden position-relative ipad-top-space" style={{ backgroundImage: 'url(/images/demo-minimal-portfolio-pattern.svg)' }}>
                                    <div class="container-fluid h-100 p-0">
                                        <div class="row g-0 h-100">
                                            <div class="col-lg-6 pt-6 pb-6 ps-8 pe-8 xxl-ps-4 xxl-pe-6 lg-ps-4 lg-pe-8 md-ps-15px md-pe-15px">
                                                <div class="h-100 text-white">
                                                    <div class="row mb-13 xl-mb-70px sm-mb-50px">
                                                        <div class="col-12">
                                                            <h1 class="fs-130 xxl-fs-110 lg-fs-80 ls-minus-7px fw-700 md-ls-minus-2px mb-20px d-block">{data.perfil.nombre}</h1>
                                                        </div>
                                                        <div class="col-xl-10 offset-xl-2">
                                                            <span class="fs-150 xxl-fs-110 lg-fs-80 lh-100 lg-lh-60 ls-minus-5px md-ls-minus-2px mb-8 md-mb-30px d-block">{data.perfil.primer_apellido}</span>
                                                        </div>
                                                        <div class="col-xxl-9 offset-xxl-2 last-paragraph-no-margin">
                                                            <div class="bg-dark-gray border-radius-100px fs-12 text-white ps-20px pe-20px d-inline-block text-uppercase fw-500 mb-5 ls-05px">{data.perfil.profesion}</div>
                                                            <p class="md-w-65 sm-w-80 xs-w-100">{data.perfil.descripcion}</p>
                                                        </div>
                                                        <div className="col-12 text-center m-4">
                                                            <img src={fotoPerfil} class="rounded-circle w-120px h-120px object-fit-cover" alt="" data-no-retina="" />
                                                        </div>
                                                    </div>
                                                    <div class="row text-lg-start text-center mb-13 xl-mb-70px sm-mb-50px">
                                                        <div class="col-12">
                                                            <span class="fs-50 lg-fs-40 ls-minus-3px lg-ls-minus-2px mb-10px md-outside-box-left-8 xs-outside-box-left-0 d-block">{data.perfil.contacto.telefono}</span>
                                                        </div>
                                                        <div class="col-12 text-lg-end text-center">
                                                            <a class="alt-font fs-60 xl-fs-50 lg-fs-40 fw-700 ls-minus-3px xl-ls-minus-1px xs-ls-minus-2px md-outside-box-right-7 xs-outside-box-right-0">{data.perfil.contacto.email}</a>
                                                        </div>
                                                        <div class="col-12 text-lg-center text-center">
                                                            <span class="fs-30 xl-fs-30 lg-fs-30">{data.perfil.contacto.direccion}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-35px">
                                                        <div class="col-12">
                                                            <span class="mb-10px d-block fs-18 fw-600">Habilidades</span>
                                                            <div class="position-relative">
                                                                <div class="separator-line-1px w-100 d-block bg-white"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center mb-13 xl-mb-50px">
                                                        <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 offset-xxl-1">
                                                            <ul class="p-0 m-0 list-style-02 appear anime-child anime-complete row">
                                                                {
                                                                    data.habilidades?.length > 0 ?
                                                                        data.habilidades.map((habilidad, index) => (
                                                                            <li className="col-6"><i class="fa-solid fa-plus fs-12 me-10px"></i>{habilidad.titulo}</li>
                                                                        )) :
                                                                        <li className="col-6">Sin habilidades añadidas</li>
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-13 xl-mb-50px">
                                                        <div class="col-12">
                                                            <h4 class="ls-minus-1px mb-30px d-block">Formación <span class="fw-700">académica</span></h4>
                                                        </div>
                                                        <div class="col-12 appear anime-child anime-complete">
                                                            {
                                                                data.formacion?.length > 0 ?
                                                                    data.formacion.map((form, index) => (
                                                                        <div class="row border-top border-color-white g-0">
                                                                            <div class="col-1 text-center align-self-center">
                                                                                <span class="fs-14 fw-600">{index + 1}</span>
                                                                            </div>
                                                                            <div class="col-xl-9 col-9 align-self-center last-paragraph-no-margin ps-30px pe-30px pt-20px pb-20px xs-ps-15px xs-pe-15px">
                                                                                <p>{form.titulo ? form.titulo : 'Sin titulo'} - <span class="fw-600">{form.lugar ? form.lugar : 'Sin lugar'}</span></p>
                                                                            </div>
                                                                            <div class="col-xl-2 col-2 align-self-center text-center d-flex flex-column">
                                                                                <span class="fs-14 fw-600">{(form.fecha_inicio ? formatDate(form.fecha_inicio) : 'No disponible')}</span>
                                                                                <span class="fs-14 fw-600">{(form.actualidad ? 'Actualidad' : (form.fecha_fin ? formatDate(form.fecha_fin) : 'No disponible'))}</span>
                                                                            </div>
                                                                        </div>
                                                                    )) :
                                                                    <div class="row border-top border-color-white g-0">
                                                                        <div class="col-1 text-center align-self-center">
                                                                            <span class="fs-14 fw-600"></span>
                                                                        </div>
                                                                        <div class="col-xl-10 col-9 last-paragraph-no-margin ps-30px pe-30px pt-20px pb-20px xs-ps-15px xs-pe-15px">
                                                                            <p>No tienes formaciones</p>
                                                                        </div>
                                                                        <div class="col-xl-1 col-2 align-self-center text-center">
                                                                            <span class="fs-14 fw-600"></span>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div class="row mb-13 xl-mb-50px">
                                                        <div class="col-12">
                                                            <h4 class="ls-minus-1px mb-30px d-block">Experiencia <span class="fw-700">laboral</span></h4>
                                                        </div>
                                                        <div class="col-12 appear anime-child anime-complete">
                                                            {
                                                                data.experiencia?.length > 0 ?
                                                                    data.experiencia.map((exp, index) => (
                                                                        <div class="row border-top border-color-white g-0">
                                                                            <div class="col-1 text-center align-self-center">
                                                                                <span class="fs-14 fw-600">{index + 1}</span>
                                                                            </div>
                                                                            <div class="col-xl-9 col-9 last-paragraph-no-margin ps-30px pe-30px pt-20px pb-20px xs-ps-15px xs-pe-15px align-self-center">
                                                                                <p>{exp.titulo ? exp.titulo : 'Sin puesto'} - <span class="fw-600">{exp.lugar ? exp.lugar : 'Sin lugar'}</span></p>
                                                                            </div>
                                                                            <div class="col-xl-2 col-2 align-self-center text-center d-flex flex-column">
                                                                                <span class="fs-14 fw-600">{(exp.fecha_inicio ? formatDate(exp.fecha_inicio) : 'No disponible')}</span>
                                                                                <span class="fs-14 fw-600">{(exp.actualidad ? 'Actualidad' : (exp.fecha_fin ? formatDate(exp.fecha_fin) : 'No disponible'))}</span>
                                                                            </div>
                                                                        </div>
                                                                    )) :
                                                                    <div class="row border-top border-color-white g-0">
                                                                        <div class="col-1 text-center align-self-center">
                                                                            <span class="fs-14 fw-600"></span>
                                                                        </div>
                                                                        <div class="col-xl-10 col-9 last-paragraph-no-margin ps-30px pe-30px pt-20px pb-20px xs-ps-15px xs-pe-15px">
                                                                            <p>No tienes experiencia laboral</p>
                                                                        </div>
                                                                        <div class="col-xl-1 col-2 align-self-center text-center">
                                                                            <span class="fs-14 fw-600"></span>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div class="row mb-13 xl-mb-50px">
                                                        <div class="col-12">
                                                            <h4 class="ls-minus-1px mb-30px d-block">Idiomas</h4>
                                                        </div>
                                                        <div class="col-12 appear anime-child anime-complete">
                                                            {
                                                                data.idiomas?.length > 0 ?
                                                                    data.idiomas.map((idioma, index) => (
                                                                        <div class="row border-top border-color-white g-0">
                                                                            <div class="col-1 text-center align-self-center">
                                                                                <span class="fs-14 fw-600">{index + 1}</span>
                                                                            </div>
                                                                            <div class="col-xl-10 col-9 last-paragraph-no-margin ps-30px pe-30px pt-20px pb-20px xs-ps-15px xs-pe-15px">
                                                                                <p>{idioma.titulo}</p>
                                                                            </div>
                                                                            <div class="col-xl-1 col-2 align-self-center text-center">
                                                                                <span class="fs-14 fw-600">{idioma.nivel}</span>
                                                                            </div>
                                                                        </div>
                                                                    )) :
                                                                    <div class="row border-top border-color-white g-0">
                                                                        <div class="col-1 text-center align-self-center">
                                                                            <span class="fs-14 fw-600"></span>
                                                                        </div>
                                                                        <div class="col-xl-10 col-9 last-paragraph-no-margin ps-30px pe-30px pt-20px pb-20px xs-ps-15px xs-pe-15px">
                                                                            <p>No tienes idiomas</p>
                                                                        </div>
                                                                        <div class="col-xl-1 col-2 align-self-center text-center">
                                                                            <span class="fs-14 fw-600"></span>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12 btn-dual text-center">
                                                        <button onClick={() => { openModal(); handleDownloadPDF() }} data-tooltip-id="download-tooltip" class="btn btn-large btn-transparent-white btn-hover-animation-switch btn-icon-left d-table d-lg-inline-block lg-mb-15px md-mx-auto">
                                                            <span>
                                                                <span class="btn-text">Descargar CV</span>
                                                                <span class="btn-icon"><i class="fa-solid fa-download"></i></span>
                                                                <span class="btn-icon"><i class="fa-solid fa-download"></i></span>
                                                            </span>
                                                        </button>
                                                        <Tooltip id="download-tooltip" className='tooltip text-start'>
                                                            <span className="fw-700 fs-17 text-white">Descargar (PDF)</span>
                                                        </Tooltip>
                                                    </div>
                                                    <AnimatePresence>
                                                        {downloadModal && (
                                                            <>
                                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 0.3, delay: 0.1 }} exit={{ opacity: 0 }} className="mfp-bg mfp-ready" onClick={closeModal}></motion.div>
                                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.1 }} exit={{ opacity: 0, scale: 0.8 }} className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{ height: '1253px' }}>
                                                                    <div className="mfp-container mfp-inline-holder">
                                                                        <div className="mfp-content">
                                                                            <div className="zoom-anim-dialog col-xl-4 col-lg-6 col-md-7 col-11 mx-auto bg-white text-center modal-popup-main p-50px">
                                                                                <span className="text-dark-gray fw-600 fs-24 mb-10px d-block">Generando CV</span>
                                                                                <div class="cardDown">
                                                                                    <div class="loaderDown">
                                                                                        <span className="text-black">Cargando</span>
                                                                                        <div class="wordsDown">
                                                                                            <span class="wordDown">detalles</span>
                                                                                            <span class="wordDown">datos</span>
                                                                                            <span class="wordDown">recursos</span>
                                                                                            <span class="wordDown">fuentes</span>
                                                                                            <span class="wordDown">secciones</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <p className="fs-18 mb-10px text-dark-gray d-block">Tu CV se está preparando. La descarga comenzará en breve. ¡Gracias por tu paciencia! </p>
                                                                                {/* <button className="btn btn-very-small btn-rounded btn-transparent-dark-gray popup-modal-dismiss mt-10px mx-2" onClick={() => { handleDownloadPDF() }}>Descargar de nuevo</button>
                                                                                <button className="btn btn-very-small btn-rounded btn-dark-gray md-mx-auto mt-10px mx-2" onClick={closeModal}>Cancelar</button> */}
                                                                                <div className="d-flex flex-c justify-content-center mt-12">
                                                                                    <div class="typewriter">
                                                                                        <div class="slide"><i></i></div>
                                                                                        <div class="paper"></div>
                                                                                        <div class="keyboard"></div>
                                                                                    </div>
                                                                                </div>
                                                                                <button type="button" className="mfp-close" onClick={closeModal}>×</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 pt-6 pb-6 ps-8 pe-8 xxl-ps-4 xxl-pe-6 lg-ps-4 lg-pe-8 md-ps-15px md-pe-15px bg-dark d-flex flex-column align-items-center position-relative justify-content-center">
                                                {cvImage ?
                                                    <>
                                                        <img src={cvImage} class="img-fluid shadow-lg" />
                                                        <div className="col-12 btn-dual text-center mt-5">
                                                            <button onClick={() => { openModal(); handleDownloadPDF() }} data-tooltip-id="download-tooltip" class="btn btn-large btn-transparent-white btn-hover-animation-switch btn-icon-left d-table d-lg-inline-block lg-mb-15px md-mx-auto">
                                                                <span>
                                                                    <span class="btn-text">Descargar CV</span>
                                                                    <span class="btn-icon"><i class="fa-solid fa-download"></i></span>
                                                                    <span class="btn-icon"><i class="fa-solid fa-download"></i></span>
                                                                </span>
                                                            </button>
                                                            <Tooltip id="download-tooltip" className='tooltip text-start'>
                                                                <span className="fw-700 fs-17 text-white">Descargar (PDF)</span>
                                                            </Tooltip>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div class="loader"></div>
                                                        <span class="text-white text-center fw-400 ls-0px mt-2 mb-0">Cargando vista previa del CV</span>
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </section>
                                :
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 text-center">
                                        <span className={`fw-600 z-index-1 position-relative text-danger`}>
                                            Si quieres descargar tu CV revisa los datos faltantes en:
                                        </span>
                                        <p className={`fw-600 position-relative text-white`}>
                                            {validateCurriculum().join(', ')}
                                        </p>
                                    </div>
                                </div>

                            :
                            <></>
                    }

                </>
            }
        </>
    )
}

export default DetallePage