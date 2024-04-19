import { useMultiStep } from '../context/MultiStepContext';
import { Link } from 'react-router-dom';

function CrearPage() {

    const { steps, currentStepIndex, step, back, next } =
        useMultiStep();

    return (
        <>
            <h1>Crear CV</h1>

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
        </>
    )
}

export default CrearPage;