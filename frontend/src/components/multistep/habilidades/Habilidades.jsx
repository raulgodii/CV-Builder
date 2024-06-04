import { useForm, useFieldArray } from 'react-hook-form';
import { useCv } from '../../../context/CvContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function Habilidades() {
    const { data, updateCv, next, back } = useCv();
    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ defaultValues: data, mode: 'onChange' });

    const { fields, append, remove } = useFieldArray({ control, name: 'habilidades' });

    useEffect(() => {
        // console.log(errors);
    }, [errors]);

    const onChange = () => {
        const newData = getValues();
        const updatedData = {
            ...data,
            habilidades: newData.habilidades
        };
        updateCv(updatedData);
    };

    const onClickNext = handleSubmit(() => {
        next();
    })

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
        updateCv(updatedData);
    };

    const childVariants = {
        hidden: { opacity: 0, translateY: 30 },
        visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <>
            <div className="col-xl-10 col-lg-12">
                <div className=" text-center">
                    <h6 className="fw-700 alt-font text-white ls-minus-2px">Habilidades</h6>
                </div>
                <motion.form onChange={onChange} className="contact-form-style-02" initial="hidden" animate="visible"
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
                            <motion.div key={habilidad.id} variants={childVariants} className="row form-group border border-radius-4px border-color-dark-gray m-3 py-3 bg-gradient-dark-gray-left-transparent">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <div onClick={() => handleRemoveHabilidad(index)} className="border-color-red text-danger slider-one-slide-next-1 border border-color-extra-medium-gray swiper-button-next slider-navigation-style-04 m-0">
                                        <i className="feather icon-feather-trash-2"></i>
                                    </div>
                                </div>
                                <div className="col-9 row d-flex align-items-center justify-content-center">
                                    <div className='col-md-8 p-2'>
                                        <input maxLength={20} className={`bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.habilidades?.[index]?.titulo ? 'is-invalid' : ''}`} type="text" placeholder="Habilidad"
                                            onChange={(e) => setValue(`habilidades[${index}].titulo`, e.target.value)}
                                            {...register(`habilidades[${index}].titulo`, { required: true, maxLength: 20 })} />
                                    </div>
                                    <div className='col-md-4 p-2'>
                                        <div className="select">
                                            <select className={`bg-black form-control border-color-white box-shadow-double-large ${errors?.habilidades?.[index]?.puntuacion ? 'is-invalid' : ''}`} name="select" onChange={(e) => setValue(`habilidades[${index}].puntuacion`, e.target.value)}
                                                {...register(`habilidades[${index}].puntuacion`, { required: true })}>
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
                    <div className="text-center">
                        <button type='button' className="position-relative btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={handleAddHabilidad}>
                            Añadir habilidad
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                </motion.form>
            </div>
            <div className="row d-flex justify-content-center align-items-center ">
                <div className="col text-md-start">
                    <button onClick={back} className="btn btn-very-small btn-white btn-hover-animation-switch btn-icon-left d-table d-lg-inline-block md-mx-auto">
                        <span>
                            <span className="btn-text">Volver</span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-left"></i></span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-left"></i></span>
                        </span>
                    </button>
                </div>
                <div className="col text-md-end">
                    <button onClick={onClickNext} className="btn btn-very-small btn-white btn-hover-animation-switch d-table d-lg-inline-block md-mx-auto">
                        <span>
                            <span className="btn-text">Siguiente</span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Habilidades;
