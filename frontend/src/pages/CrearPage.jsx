import { useMultiStep } from '../context/MultiStepContext';
import { Link } from 'react-router-dom';

function CrearPage() {

    const { steps, currentStepIndex, step, back, next } =
        useMultiStep();

    return (
        <>
            <section className="position-relative bg-very-light-gray">
                <div className="container">
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
                        <div className="row">
                            <div className="col-xl-6 col-md-7">

                                {currentStepIndex > 0 && (
                                    <button onClick={back} className="btn btn-dark-gray btn-box-shadow btn-switch-text btn-large left-icon btn-round-edge submit text-transform-none" type="submit">
                                        <span>
                                            <span><i className="line-icon-Arrow-Back3"></i></span>
                                            <span className="btn-double-text" data-text="Volver">Volver</span>
                                        </span>
                                    </button>
                                )}

                            </div>
                            <div className="col-xl-6 col-md-5 text-center text-md-end sm-mt-20px">
                                {currentStepIndex + 1 == steps.length ? (
                                    <Link to="/gestionar">
                                        <button className="btn btn-dark-gray btn-box-shadow btn-switch-text btn-large left-icon btn-round-edge submit text-transform-none" type="submit">
                                            <span>
                                                <span><i className="line-icon-Arrow-Forward2"></i></span>
                                                <span className="btn-double-text" data-text="Siguiente">Finalizar</span>
                                            </span>
                                        </button>
                                    </Link>
                                ) : (
                                    <button onClick={next} className="btn btn-dark-gray btn-box-shadow btn-switch-text btn-large left-icon btn-round-edge submit text-transform-none" type="submit">
                                        <span>
                                            <span><i className="line-icon-Arrow-Forward2"></i></span>
                                            <span className="btn-double-text" data-text="Siguiente">Siguiente</span>
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