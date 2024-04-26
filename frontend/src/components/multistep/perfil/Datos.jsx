import { useForm } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';

function Datos() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data, updateData } = useMultiStep();

    useEffect(() => {
        console.log(data);
    }, [data]);

    // const onChange = (newData) => {
    //     updateData(newData);
    // };

    const onChange = (newData) => {
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
        // <form onChange={handleSubmit(onChange)}>
        //     <h4>Datos Personales</h4>
        //     <label>Nombre:</label>
        //     <input type="text" {...register("perfil.nombre")} value={data.perfil.nombre}/>
        //     <label>Subtitulo:</label>
        //     <input type="text" {...register("perfil.subtitulo")} value={data.perfil.subtitulo}/>
        //     <label>Descripcion:</label>
        //     <input type="text" {...register("perfil.descripcion")} value={data.perfil.descripcion}/>
        //     <label>Fecha nacimiento:</label>
        //     <input type="date" {...register("perfil.fecha_nacimiento")} value={data.perfil.fecha_nacimiento}/>
        // </form>
        <div className="col-xl-10 col-lg-12">
            <form onChange={handleSubmit(onChange)} className="row contact-form-style-02" data-anime="{ &quot;el&quot;: &quot;childs&quot;, &quot;translateY&quot;: [30, 0], &quot;opacity&quot;: [0,1], &quot;duration&quot;: 800, &quot;delay&quot;: 200, &quot;staggervalue&quot;: 300, &quot;easing&quot;: &quot;easeOutQuad&quot; }">
                <div className="col-md-6 mb-30px">
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Nombre" {...register("perfil.nombre")} value={data.perfil.nombre}/>
                </div>
                <div className="col-md-6 mb-30px">
                    <input className="border-radius-4px border-color-white box-shadow-double-large form-control" type="email" placeholder="Subtitulo" {...register("perfil.subtitulo")} value={data.perfil.subtitulo}/>
                </div>
                <div className="col-md-6 mb-30px">
                    <input className="form-control border-radius-4px border-color-white box-shadow-double-large" type="date" aria-label="date"  value={data.perfil.fecha_nacimiento}/>
                </div>
                <div className="col-md-6 mb-30px ">
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Descripcion" {...register("perfil.descripcion")} value={data.perfil.descripcion}/>
                </div>
            </form>
        </div>
    )
}

export default Datos