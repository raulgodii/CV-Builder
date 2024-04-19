import { useForm } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';

function Contacto() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data, updateData } = useMultiStep();

    useEffect(() => {
        console.log(data);
    }, [data]);

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
            <h4>Datos Contacto</h4>
            <label>Telefono:</label>
            <input type="number" {...register("perfil.contacto.telefono")} value={data.perfil.contacto.telefono}/>
            <label>Email:</label>
            <input type="email" {...register("perfil.contacto.email")} value={data.perfil.contacto.email}/>
            <label>Direccion:</label>
            <input type="text" {...register("perfil.contacto.direccion")} value={data.perfil.contacto.direccion}/>
        </form>
    )
}

export default Contacto