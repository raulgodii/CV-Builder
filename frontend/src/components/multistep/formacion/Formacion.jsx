import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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

    const childVariants = {
        hidden: { opacity: 0, translateY: 30 },
        visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        // <form onChange={handleSubmit(onChange)}>
        //     <h4>Formacion</h4>

        //     {fields.map((formacion, index) => (
        //         <div key={formacion.id}>
        //             <label>Formacion {index + 1}:</label>
        //             <input
        //                 type="text"
        //                 defaultValue={formacion.titulo}
        //                 onChange={(e) => setValue(`formacion[${index}].titulo`, e.target.value)}
        //                 {...register(`formacion[${index}].titulo`)}
        //             />
        //             <input
        //                 type="date"
        //                 defaultValue={formacion.fecha}
        //                 onChange={(e) => setValue(`formacion[${index}].fecha`, e.target.value)}
        //                 {...register(`formacion[${index}].fecha`)}
        //             />
        //             <input
        //                 type="text"
        //                 defaultValue={formacion.lugar}
        //                 onChange={(e) => setValue(`formacion[${index}].lugar`, e.target.value)}
        //                 {...register(`formacion[${index}].lugar`)}
        //             />
        //             <button type="button" onClick={() => handleRemoveFormacion(index)}>
        //                 Eliminar
        //             </button>
        //         </div>
        //     ))}

        //     <button type="button" onClick={handleAddFormacion}>
        //         Añadir formacion
        //     </button>
        // </form>
        <>
            <div className="col-xl-10 col-lg-12">
                <div className=" text-center">
                    <h6 className="fw-700 alt-font text-dark-gray ls-minus-2px">Formación Académica</h6>
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

                    {fields.map((formacion, index) => (
                        <>
                            <motion.div key={formacion.id} variants={childVariants} className="row form-group">
                                <div className="col-3 mb-30px d-flex align-items-center justify-content-center">
                                    <div onClick={() => handleRemoveFormacion(index)} className="slider-one-slide-next-1 bg-white border border-color-extra-medium-gray text-dark-gray swiper-button-next slider-navigation-style-04">
                                        <i className="feather icon-feather-trash-2"></i>
                                    </div>
                                </div>
                                <div className="col-9 row d-flex align-items-center justify-content-center">
                                    <div className='col mb-30px'>
                                        <input
                                            placeholder='titulo'
                                            type="text"
                                            defaultValue={formacion.titulo}
                                            onChange={(e) => setValue(`formacion[${index}].titulo`, e.target.value)}
                                            {...register(`formacion[${index}].titulo`)}
                                        />
                                    </div>
                                    <div className='col mb-30px'>
                                        <input
                                            type="date"
                                            defaultValue={formacion.fecha}
                                            onChange={(e) => setValue(`formacion[${index}].fecha`, e.target.value)}
                                            {...register(`formacion[${index}].fecha`)}
                                        />
                                    </div>
                                    <div className='col mb-30px'>
                                        <input
                                            placeholder='lugar'
                                            type="text"
                                            defaultValue={formacion.lugar}
                                            onChange={(e) => setValue(`formacion[${index}].lugar`, e.target.value)}
                                            {...register(`formacion[${index}].lugar`)}
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
                                <p>No se ha añadido ninguna formación</p>
                            </div>
                        </motion.div>
                    }
                    <div class="text-center">
                        <button type='button' class="position-relative btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={handleAddFormacion}>
                            Añadir formación
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                </motion.form>
            </div>
        </>
    );
}

export default Formacion;
