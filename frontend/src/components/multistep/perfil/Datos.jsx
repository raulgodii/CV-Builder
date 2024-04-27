import { useForm } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';

function Datos() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data, updateData, updateDomLoaded, domLoaded } = useMultiStep();

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        updateDomLoaded(!domLoaded)
    }, []);

    const onChange = (newData) => {
        console.log(newData)
        const updatedPerfil = {
            ...data.perfil,
            ...newData.perfil
        };

        const updatedData = {
            ...data,
            perfil: updatedPerfil
        };

        updateData(updatedData);
    };

    return (
        <div className="col-xl-10 col-lg-12">
            <div className=" text-center">
                <h6 className="fw-700 alt-font text-dark-gray ls-minus-2px">Datos personales</h6>
            </div>
            <form onChange={handleSubmit(onChange)} className="row contact-form-style-02" data-anime="{ &quot;el&quot;: &quot;childs&quot;, &quot;translateY&quot;: [30, 0], &quot;opacity&quot;: [0,1], &quot;duration&quot;: 300, &quot;delay&quot;: 0, &quot;staggervalue&quot;: 300, &quot;easing&quot;: &quot;easeOutQuad&quot; }">
                <div className="col-md-6 mb-30px position-relative form-group">
                    <label className="text-dark-gray fw-500">Nombre</label>
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Nombre" {...register("perfil.nombre")} value={data.perfil.nombre} />
                </div>
                <div className="col-md-6 mb-30px position-relative form-group">
                    <label className="text-dark-gray fw-500">Primer apellido</label>
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Primer apellido" {...register("perfil.primer_apellido")} value={data.perfil.primer_apellido} />
                </div>
                <div className="col-md-6 mb-30px">
                    <label className="text-dark-gray fw-500">Profesión <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" title='<span className="tooltip-title">Recuerda</span><p className=m-0>Escribe tu profesión o el nombre de tu sector en pocas palabras</p>'><i className="fa-solid fa-circle-exclamation"></i></span></label>
                    <input className="border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Profesión" {...register("perfil.profesion")} value={data.perfil.profesion} />
                </div>
                <div className="col-md-6 mb-30px">
                    <label className="text-dark-gray fw-500">Fecha de nacimiento</label>
                    <input className="form-control border-radius-4px border-color-white box-shadow-double-large" type="date" aria-label="date" {...register("perfil.fecha_nacimiento")} value={data.perfil.fecha_nacimiento} />
                </div>
                <div className="col-md-12 mb-30px ">
                    <label className="text-dark-gray fw-500">Descripción sobre ti <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" title='<span className="tooltip-title">Descripción</span><p className=m-0>Describete en una frase</p><p className=m-0><b><u>Ejemplo:</u></b> "Especialista en desarrollo de negocio con experiencia en identificar oportunidades de crecimiento y establecer alianzas estratégicas."</p>'><i className="fa-solid fa-circle-question"></i></span></label>
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Descríbete en una frase" {...register("perfil.descripcion")} value={data.perfil.descripcion} />
                </div>
            </form>
        </div>
    )
}

export default Datos