import ViewCV from "../components/ViewCV";
import ReactDOMServer from "react-dom/server";
import { useCv } from "../context/CvContext";
import { Tooltip } from 'react-tooltip';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from '../api/axios';

function DetallePage() {
    const { data, convertContext, getCv } = useCv();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getCv(id);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                navigate('/404');
            }
        };

        fetchData();
    }, []);

    const fetchImageAsBase64 = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/cv/files/${data.perfil.foto}`, {
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
            console.error('Error al cargar la imagen y convertirla a base64:', error);
            throw error;
        }
    };

    const handleDownloadPDF = async () => {
        const base64Image = await fetchImageAsBase64();
        console.log(base64Image)
        const cvHTML = ReactDOMServer.renderToString(<ViewCV data={data} base64Image={base64Image} />);
        convertContext({ html: cvHTML });
    };

    return (
        <>
            {loading ? <div class="page-loader"></div> :
                <section className="ipad-top-space-margin md-h-850px bg-very-light-gray">
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
                </section>
            }
        </>
    )
}

export default DetallePage