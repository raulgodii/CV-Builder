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
        <form onChange={handleSubmit(onChange)}>
            <h4>Datos Personales</h4>
            <label>Nombre:</label>
            <input type="text" {...register("perfil.nombre")} value={data.perfil.nombre}/>
            <label>Subtitulo:</label>
            <input type="text" {...register("perfil.subtitulo")} value={data.perfil.subtitulo}/>
            <label>Descripcion:</label>
            <input type="text" {...register("perfil.descripcion")} value={data.perfil.descripcion}/>
            <label>Fecha nacimiento:</label>
            <input type="date" {...register("perfil.fecha_nacimiento")} value={data.perfil.fecha_nacimiento}/>
        </form>
    )
}

export default Datos