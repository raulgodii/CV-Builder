import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';

function Experiencia() {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { data, updateData } = useMultiStep();
    const { fields, append, remove } = useFieldArray({ control, name: 'experiencia' });

    useEffect(() => {
        console.log(data);
        // Agregar campos preexistentes a fields
        data.experiencia.forEach((experiencia) => {
            append(experiencia);
        });
    }, []);

    const onChange = (newData) => {
        const updatedData = {
            ...data,
            experiencia: newData.experiencia
        };
        updateData(updatedData);
    };

    const handleAddExperiencia = () => {
        append({ titulo: '', fecha: '', lugar: '' }); // Añadir nuevo campo de experiencia al array
    };

    const handleRemoveExperiencia = (index) => {
        remove(index); // Eliminar campo de experiencia del array

        const newExperiencia = [...data.experiencia];
        newExperiencia.splice(index, 1);
        const updatedData = {
            ...data,
            experiencia: newExperiencia
        };
        updateData(updatedData);
    };

    return (
        <form onChange={handleSubmit(onChange)}>
            <h4>Experiencia</h4>

            {fields.map((experiencia, index) => (
                <div key={experiencia.id}>
                    <label>Experiencia {index + 1}:</label>
                    <input
                        type="text"
                        defaultValue={experiencia.titulo}
                        onChange={(e) => setValue(`experiencia[${index}].titulo`, e.target.value)}
                        {...register(`experiencia[${index}].titulo`)}
                    />
                    <input
                        type="date"
                        defaultValue={experiencia.fecha}
                        onChange={(e) => setValue(`experiencia[${index}].fecha`, e.target.value)}
                        {...register(`experiencia[${index}].fecha`)}
                    />
                    <input
                        type="text"
                        defaultValue={experiencia.lugar}
                        onChange={(e) => setValue(`experiencia[${index}].lugar`, e.target.value)}
                        {...register(`experiencia[${index}].lugar`)}
                    />
                    <button type="button" onClick={() => handleRemoveExperiencia(index)}>
                        Eliminar
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddExperiencia}>
                Añadir experiencia
            </button>
        </form>
    );
}

export default Experiencia;
