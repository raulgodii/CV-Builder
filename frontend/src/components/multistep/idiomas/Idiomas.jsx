import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';

function Idiomas() {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { data, updateData } = useMultiStep();
    const { fields, append, remove } = useFieldArray({ control, name: 'idiomas' });

    useEffect(() => {
        console.log(data);
        // Agregar campos preexistentes a fields
        data.idiomas.forEach((idioma) => {
            append(idioma);
        });
    }, []);

    const onChange = (newData) => {
        const updatedData = {
            ...data,
            idiomas: newData.idiomas
        };
        updateData(updatedData);
    };

    const handleAddIdioma = () => {
        append({ titulo: '', nivel: '' }); // Añadir nuevo campo de idioma al array
    };

    const handleRemoveIdioma = (index) => {
        remove(index); // Eliminar campo de idioma del array

        const newIdiomas = [...data.idiomas];
        newIdiomas.splice(index, 1);
        const updatedData = {
            ...data,
            idiomas: newIdiomas
        };
        updateData(updatedData);
    };

    return (
        <form onChange={handleSubmit(onChange)}>
            <h4>Idiomas</h4>

            {fields.map((idioma, index) => (
                <div key={idioma.id}>
                    <label>Idioma {index + 1}:</label>
                    <input
                        type="text"
                        defaultValue={idioma.titulo}
                        onChange={(e) => setValue(`idiomas[${index}].titulo`, e.target.value)}
                        {...register(`idiomas[${index}].titulo`)}
                    />
                    <input
                        type="text"
                        defaultValue={idioma.nivel}
                        onChange={(e) => setValue(`idiomas[${index}].nivel`, e.target.value)}
                        {...register(`idiomas[${index}].nivel`)}
                    />
                    <button type="button" onClick={() => handleRemoveIdioma(index)}>
                        Eliminar
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddIdioma}>
                Añadir idioma
            </button>
        </form>
    );
}

export default Idiomas;
