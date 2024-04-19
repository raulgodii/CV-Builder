import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';

function Formacion() {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { data, updateData } = useMultiStep();
    const { fields, append, remove } = useFieldArray({ control, name: 'formacion' });

    useEffect(() => {
        console.log(data);
        // Agregar campos preexistentes a fields
        data.formacion.forEach((formacion) => {
            append(formacion);
        });
    }, []);

    const onChange = (newData) => {
        const updatedData = {
            ...data,
            formacion: newData.formacion
        };
        updateData(updatedData);
    };

    const handleAddFormacion = () => {
        append({ titulo: '', fecha: '', lugar: '' }); // Añadir nuevo campo de formacion al array
    };

    const handleRemoveFormacion = (index) => {
        remove(index); // Eliminar campo de formacion del array

        const newFormacion = [...data.formacion];
        newFormacion.splice(index, 1);
        const updatedData = {
            ...data,
            formacion: newFormacion
        };
        updateData(updatedData);
    };

    return (
        <form onChange={handleSubmit(onChange)}>
            <h4>Formacion</h4>

            {fields.map((formacion, index) => (
                <div key={formacion.id}>
                    <label>Formacion {index + 1}:</label>
                    <input
                        type="text"
                        defaultValue={formacion.titulo}
                        onChange={(e) => setValue(`formacion[${index}].titulo`, e.target.value)}
                        {...register(`formacion[${index}].titulo`)}
                    />
                    <input
                        type="date"
                        defaultValue={formacion.fecha}
                        onChange={(e) => setValue(`formacion[${index}].fecha`, e.target.value)}
                        {...register(`formacion[${index}].fecha`)}
                    />
                    <input
                        type="text"
                        defaultValue={formacion.lugar}
                        onChange={(e) => setValue(`formacion[${index}].lugar`, e.target.value)}
                        {...register(`formacion[${index}].lugar`)}
                    />
                    <button type="button" onClick={() => handleRemoveFormacion(index)}>
                        Eliminar
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddFormacion}>
                Añadir formacion
            </button>
        </form>
    );
}

export default Formacion;
