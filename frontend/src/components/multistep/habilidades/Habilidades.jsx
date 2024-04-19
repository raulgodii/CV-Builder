import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';

function Habilidades() {
    const { register, control, handleSubmit, formState: { errors }, unregister } = useForm();
    const { data, updateData } = useMultiStep();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = (newData) => {
        console.log(data);
        console.log(newData);
        const updatedData = {
            ...data,
            habilidades: newData.habilidades
        };

        updateData(updatedData);
    };

    const handleAddHabilidad = () => {
        // const newHabilidades = [...data.habilidades, { habilidad: '' }];
        // updateData({ habilidades: newHabilidades });
        const updatedHabilidades = [
            ...data.habilidades,
            { titulo: '' }
        ];

        const updatedData = {
            ...data,
            habilidades: updatedHabilidades
        };

        updateData(updatedData);
    };

    // const handleRemoveHabilidad = (index) => {
    //     const newHabilidades = [...data.habilidades];
    //     newHabilidades.splice(index, 1);
    //     updateData({ habilidades: newHabilidades });
    // };

    const handleRemoveHabilidad = (index) => {
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

            {data.habilidades.map((habilidad, index) => (
                <div key={index}>
                    <label>Habilidad {index + 1}:</label>
                    <input
                        type="text"
                        value={habilidad.titulo}
                        {...register(`habilidades[${index}].titulo`)}
                    />
                    <button type="button" onClick={() => {
                        handleRemoveHabilidad(index);
                        unregister(`habilidades[${index}].titulo`);
                    }}>
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
