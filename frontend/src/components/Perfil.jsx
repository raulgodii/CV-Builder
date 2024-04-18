import { useForm } from 'react-hook-form';
import { useMultiStep } from '../context/MultiStepContext';
import { useEffect } from 'react';

function Perfil() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data, updateData } = useMultiStep();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = (newData) => {
        updateData(newData);
    };

    return (
        <form onChange={handleSubmit(onChange)}>
            <h4>Perfil</h4>
            <label>Nombre:</label>
            <input type="text" {...register("perfil.nombre")} value={data.perfil.nombre}/>
            <label>Email:</label>
            <input type="email" {...register("perfil.email")} value={data.perfil.email}/>
        </form>
    )
}

export default Perfil