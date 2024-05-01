import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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

    const childVariants = {
        hidden: { opacity: 0, translateY: 30 },
        visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <>
            <div className="col-xl-10 col-lg-12">
                <div className=" text-center">
                    <h6 className="fw-700 alt-font text-dark-gray ls-minus-2px">Habilidades</h6>
                </div>
                <motion.form onChange={handleSubmit(onChange)} className="contact-form-style-02" initial="hidden" animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.25
                            }
                        }
                    }}>

                    {fields.map((habilidad, index) => (
                        <>
                            <motion.div key={habilidad.id} variants={childVariants} className="row form-group">
                                <div className="col-3 mb-30px d-flex align-items-center justify-content-center">
                                    <div onClick={() => handleRemoveHabilidad(index)} className="slider-one-slide-next-1 bg-white border border-color-extra-medium-gray text-dark-gray swiper-button-next slider-navigation-style-04">
                                        <i className="feather icon-feather-trash-2"></i>
                                    </div>
                                </div>
                                <div className="col-9 row d-flex align-items-center justify-content-center">
                                    <div className='col-md-8 mb-30px'>
                                        <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Habilidad"
                                            defaultValue={habilidad.titulo}
                                            onChange={(e) => setValue(`habilidades[${index}].titulo`, e.target.value)}
                                            {...register(`habilidades[${index}].titulo`)} />
                                    </div>
                                    <div className='col-md-4 mb-30px'>
                                        <div class="select">
                                            <select class="form-control border-color-white box-shadow-double-large" name="select" defaultValue={habilidad.puntuacion} onChange={(e) => setValue(`habilidades[${index}].puntuacion`, e.target.value)}
                                                {...register(`habilidades[${index}].puntuacion`)}>
                                                <option value="" selected hidden>Nivel</option>
                                                <option value="1">Bajo</option>
                                                <option value="2">Medio</option>
                                                <option value="3">Alto</option>
                                                <option value="4">Avanzado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    ))}
                    {
                        fields.length == 0 &&
                        <motion.div variants={childVariants} className="row form-group">
                            <div className="col d-flex align-items-center justify-content-center">
                                <p>No se han añadido habilidades</p>
                            </div>
                        </motion.div>
                    }
                    <div class="text-center">
                        <button type='button' class="position-relative btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={handleAddHabilidad}>
                            Añadir habilidad
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                </motion.form>
            </div>
        </>
    );
}

export default Habilidades;
