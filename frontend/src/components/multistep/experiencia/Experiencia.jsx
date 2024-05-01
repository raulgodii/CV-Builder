import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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

    const childVariants = {
        hidden: { opacity: 0, translateY: 30 },
        visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        // <form onChange={handleSubmit(onChange)}>
        //     <h4>Experiencia</h4>

        //     {fields.map((experiencia, index) => (
        //         <div key={experiencia.id}>
        //             <label>Experiencia {index + 1}:</label>
        //             <input
        //                 type="text"
        //                 defaultValue={experiencia.titulo}
        //                 onChange={(e) => setValue(`experiencia[${index}].titulo`, e.target.value)}
        //                 {...register(`experiencia[${index}].titulo`)}
        //             />
        //             <input
        //                 type="date"
        //                 defaultValue={experiencia.fecha}
        //                 onChange={(e) => setValue(`experiencia[${index}].fecha`, e.target.value)}
        //                 {...register(`experiencia[${index}].fecha`)}
        //             />
        //             <input
        //                 type="text"
        //                 defaultValue={experiencia.lugar}
        //                 onChange={(e) => setValue(`experiencia[${index}].lugar`, e.target.value)}
        //                 {...register(`experiencia[${index}].lugar`)}
        //             />
        //             <button type="button" onClick={() => handleRemoveExperiencia(index)}>
        //                 Eliminar
        //             </button>
        //         </div>
        //     ))}

        //     <button type="button" onClick={handleAddExperiencia}>
        //         Añadir experiencia
        //     </button>
        // </form>
        <>
            <div className="col-xl-10 col-lg-12">
                <div className=" text-center">
                    <h6 className="fw-700 alt-font text-dark-gray ls-minus-2px">Experiencia Laboral</h6>
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

                    {fields.map((experiencia, index) => (
                        <>
                            <motion.div key={experiencia.id} variants={childVariants} className="row form-group">
                                <div className="col-3 mb-30px d-flex align-items-center justify-content-center">
                                    <div onClick={() => handleRemoveExperiencia(index)} className="slider-one-slide-next-1 bg-white border border-color-extra-medium-gray text-dark-gray swiper-button-next slider-navigation-style-04">
                                        <i className="feather icon-feather-trash-2"></i>
                                    </div>
                                </div>
                                <div className="col-9 row d-flex align-items-center justify-content-center">
                                    <div className='col mb-30px'>
                                        <input
                                            placeholder='titulo'
                                            type="text"
                                            defaultValue={experiencia.titulo}
                                            onChange={(e) => setValue(`experiencia[${index}].titulo`, e.target.value)}
                                            {...register(`experiencia[${index}].titulo`)}
                                        />
                                    </div>
                                    <div className='col mb-30px'>
                                        <input
                                            type="date"
                                            defaultValue={experiencia.fecha}
                                            onChange={(e) => setValue(`experiencia[${index}].fecha`, e.target.value)}
                                            {...register(`experiencia[${index}].fecha`)}
                                        />
                                    </div>
                                    <div className='col mb-30px'>
                                        <input
                                            placeholder='lugar'
                                            type="text"
                                            defaultValue={experiencia.lugar}
                                            onChange={(e) => setValue(`experiencia[${index}].lugar`, e.target.value)}
                                            {...register(`experiencia[${index}].lugar`)}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    ))}
                    {
                        fields.length == 0 &&
                        <motion.div variants={childVariants} className="row form-group">
                            <div className="col d-flex align-items-center justify-content-center">
                                <p>No se ha añadido ninguna experiencia</p>
                            </div>
                        </motion.div>
                    }
                    <div class="text-center">
                        <button type='button' class="position-relative btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={handleAddExperiencia}>
                            Añadir experiencia
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                </motion.form>
            </div>
        </>
    );
}

export default Experiencia;
