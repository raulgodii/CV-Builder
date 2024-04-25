import { useMultiStep } from '../context/MultiStepContext';
import { Link } from 'react-router-dom';

function CrearPage() {

    const { steps, currentStepIndex, step, back, next } =
        useMultiStep();

    return (
        <>
            <section id="home" className="full-screen bg-dark-gray ipad-top-space-margin position-relative md-h-600px sm-h-500px" data-parallax-background-ratio="0.5" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}>
                <h1>Crear CV</h1>

                <div class="col fw-600 text-dark-gray text-center pt-11 pb-11 border-bottom border-color-extra-medium-gray overflow-hidden">
                    <h3 class="mb-0" data-anime='{"translateY": [-50, 0], "opacity": [0,1], "duration": 800, "staggervalue": 300, "easing": "easeOutQuad" }'>fadeInDown</h3>
                </div>

                <div>
                    Paso {currentStepIndex + 1} de {steps.length}
                </div>
                {step}
                <div>
                    {currentStepIndex > 0 && (
                        <button type="button" onClick={back}>
                            Back
                        </button>
                    )}
                    {currentStepIndex + 1 == steps.length ? (
                        <Link to="/gestionar">
                            <button>Finalizar</button>
                        </Link>
                    ) : (
                        <button onClick={next}>Siguiente</button>
                    )
                    }
                </div>
            </section>
        </>
    )
}

export default CrearPage;