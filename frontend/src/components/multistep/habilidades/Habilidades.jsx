import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';

function Habilidades() {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { data, updateData } = useMultiStep();
    const { fields, append, remove } = useFieldArray({ control, name: 'habilidades' });

    useEffect(() => {
        console.log(data);
        // Agregar campos preexistentes a fields
        data.habilidades.forEach((habilidad) => {
            append(habilidad);
        });
    }, []);

    const onChange = (newData) => {
        const updatedData = {
            ...data,
            habilidades: newData.habilidades
        };
        updateData(updatedData);
    };

    const handleAddHabilidad = () => {
        append({ titulo: '', puntuacion: '' }); // Añadir nuevo campo de habilidad al array
    };

    const handleRemoveHabilidad = (index) => {
        remove(index); // Eliminar campo de habilidad del array

        const newHabilidades = [...data.habilidades];
        newHabilidades.splice(index, 1);
        const updatedData = {
            ...data,
            habilidades: newHabilidades
        };
        updateData(updatedData);
    };

    return (
        <form onChange={handleSubmit(onChange)}>
            <h4>Habilidades</h4>

            {fields.map((habilidad, index) => (
                <div key={habilidad.id}>
                    <label>Habilidad {index + 1}:</label>
                    <input
                        type="text"
                        defaultValue={habilidad.titulo}
                        onChange={(e) => setValue(`habilidades[${index}].titulo`, e.target.value)}
                        {...register(`habilidades[${index}].titulo`)}
                    />
                    <input
                        type="text"
                        defaultValue={habilidad.puntuacion}
                        onChange={(e) => setValue(`habilidades[${index}].puntuacion`, e.target.value)}
                        {...register(`habilidades[${index}].puntuacion`)}
                    />
                    <button type="button" onClick={() => handleRemoveHabilidad(index)}>
                        Eliminar
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddHabilidad}>
                Añadir habilidad
            </button>
        </form>
    );
}

export default Habilidades;
