import { useCv } from '../context/CvContext';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function ModificarPage() {

    const { steps, currentStepIndex, step, getCv, start } = useCv();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                                <h2 className="fw-700 alt-font ls-minus-2px text-white">Modificar CV</h2>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-12 progress-bar-style-03 mt-30px">
                                <div className="progress mb-5 bg-extra-medium-gray">
                                    <div className="fs-18 fw-600 progress-bar-title d-inline-block text-white">Paso {currentStepIndex + 1} de {steps.length}</div>
                                    <div className="progress-bar m-0 border-radius-3px appear" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100" aria-label="consulting" style={{ width: `${progressPercentage}%` }}>
                                    </div>
                                    <span className="progress-bar-percent fs-16 fw-600 tex-white">{progressPercentage.toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center justify-content-center position-relative z-index-1">
                            {step}
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default ModificarPage;