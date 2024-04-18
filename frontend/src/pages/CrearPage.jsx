
import View from './../components/View';
import { useMultistepForm } from '../libs/useMultistepForm';
import Perfil from '../components/Perfil';

function CrearPage() {
    
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultistepForm([
            <Perfil></Perfil>, <div>habilidades</div>, <div>formacion</div>
        ]);

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
                <button onClick={next}>Siguiente</button>
            </div>

            {/* <form onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(onChange)}>
                <h2>Perfil</h2>
                <label>Nombre:</label>
                <input type="text" {...register("perfil.nombre")} />
                <label>Email:</label>
                <input type="email" {...register("perfil.email")} />

                <h2>Habilidades</h2>
                <label>Habilidad 1:</label>
                <input type="text" {...register("habilidades.habilidad1")} />
                <label>Habilidad 2:</label>
                <input type="text" {...register("habilidades.habilidad2")} />

                <h2>Formación</h2>
                <label>Título:</label>
                <input type="text" {...register("formacion.titulo")} />
                <label>Institución:</label>
                <input type="text" {...register("formacion.institucion")} />

                <h2>Experiencia</h2>
                <label>Empresa:</label>
                <input type="text" {...register("experiencia.empresa")} />
                <label>Puesto:</label>
                <input type="text" {...register("experiencia.puesto")} />

                <h2>Idiomas</h2>
                <label>Idioma 1:</label>
                <input type="text" {...register("idiomas.idioma1")} />
                <label>Nivel:</label>
                <input type="text" {...register("idiomas.nivel1")} />

                <input type="submit" />
            </form> */}

            
        </>
    )
}

export default CrearPage;