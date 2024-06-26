import { useEffect, useState } from 'react';
import { useCv } from '../context/CvContext';
import { useNavigate, useParams } from 'react-router-dom';

function CrearPage() {

    const { steps, currentStepIndex, step, getCv, start } = useCv();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const progressPercentage = ((currentStepIndex) / (steps.length - 1)) * 100;

    useEffect(() => {
        const fetchData = async () => {
            try {
                start();
                await getCv(id);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                navigate('/404');
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? <div class="page-loader"></div> :
                <section className="full-screen d-flex align-items-start ipad-top-space-margin bg-black">
                    <div className="container pb-5">
                        <div className="row">
                            <div className="col text-center">
                                <h2 className="fw-700 alt-font ls-minus-2px text-white">Crear CV</h2>
                            </div>

                        </div>

                        <div className="row justify-content-center">
                            <div className="col-12 progress-bar-style-03 mt-30px">
                                <div className="progress mb-5 bg-extra-medium-gray text-white">
                                    <div className="fs-18 fw-600 progress-bar-title d-inline-block">Paso {currentStepIndex + 1} de {steps.length}</div>
                                    <div className="progress-bar m-0 border-radius-3px appear" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100" aria-label="consulting" style={{ width: `${progressPercentage}%` }}>
                                    </div>
                                    <span className="progress-bar-percent fs-16 fw-600">{progressPercentage.toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center justify-content-center position-relative z-index-1">
                            {step}
                            {/* <div className="row d-flex justify-content-center align-items-center ">
                            <div className="col text-md-start">

                                {currentStepIndex > 0 && (
                                    <button onClick={back} className="btn btn-small btn-transparent-base-color btn-hover-animation-switch btn-icon-left d-table d-lg-inline-block md-mx-auto">
                                        <span>
                                            <span className="btn-text">Volver</span>
                                            <span className="btn-icon"><i className="fa-solid fa-arrow-left"></i></span>
                                            <span className="btn-icon"><i className="fa-solid fa-arrow-left"></i></span>
                                        </span>
                                    </button>

                                )}

                            </div>
                            <div className="col text-md-end">
                                {currentStepIndex + 1 == steps.length ? (
                                    <Link to="/gestionar">
                                        <button className="btn btn-small btn-base-color btn-large btn-switch-text d-table d-lg-inline-block md-mx-auto">
                                            <span>
                                                <span className="btn-double-text" data-text="Finalizar">Finalizar</span>
                                            </span>
                                        </button>
                                    </Link>
                                ) : (
                                    <button onClick={next} className="btn btn-small btn-transparent-base-color btn-hover-animation-switch d-table d-lg-inline-block md-mx-auto">
                                        <span>
                                            <span className="btn-text">Siguiente</span>
                                            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                                            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                                        </span>
                                    </button>
                                )
                                }

                            </div>
                        </div> */}
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default CrearPage;