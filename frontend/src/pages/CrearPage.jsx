import { useMultiStep } from '../context/MultiStepContext';
import { Link } from 'react-router-dom';

function CrearPage() {

    const { steps, currentStepIndex, step, back, next } =
        useMultiStep();

    return (
        <>
            <section className="ipad-top-space-margin md-h-850px bg-very-light-gray">
                <div className="container vh-100">
                    <div className="row">
                        <div className="col text-center">
                            <h2 className="fw-700 alt-font text-dark-gray ls-minus-2px">Crear CV</h2>
                        </div>

                    </div>
                    <div className="row mb-2">
                        <h6 className="col text-center">Paso {currentStepIndex + 1} de {steps.length}</h6>
                    </div>

                    <div className="row align-items-center justify-content-center position-relative z-index-1">
                        {step}
                        <div className="row d-flex justify-content-center align-items-center ">
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CrearPage;