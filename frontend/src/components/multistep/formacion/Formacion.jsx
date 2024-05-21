import { useForm, useFieldArray } from 'react-hook-form';
import { useCv } from '../../../context/CvContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function Formacion() {
    const { data, updateCv, back, next } = useCv();

    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ defaultValues: data, mode: 'onChange' });

    const { fields, append, remove } = useFieldArray({ control, name: 'formacion' });

    const onChange = () => {
        const newData = getValues();
        const updatedData = {
            ...data,
            formacion: newData.formacion
        };
        updateCv(updatedData);
    };

    const onClickNext = handleSubmit(() => {
        next();
    })

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
                    <h6 className="fw-700 alt-font text-white ls-minus-2px">Formación Académica</h6>
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
                                            className={`input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.titulo ? 'is-invalid' : ''}`}
                                            placeholder='titulo'
                                            type="text"
                                            maxLength={25}
                                            onChange={(e) => setValue(`formacion[${index}].titulo`, e.target.value)}
                                            {...register(`formacion[${index}].titulo`, {required: true, maxLength: 25})}
                                        />
                                    </div>
                                    <div className='col mb-30px'>
                                        <input
                                            className={`input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.fecha ? 'is-invalid' : ''}`}
                                            type="date"
                                            onChange={(e) => setValue(`formacion[${index}].fecha`, e.target.value)}
                                            {...register(`formacion[${index}].fecha`, {required: true})}
                                        />
                                    </div>
                                    <div className='col mb-30px'>
                                        <input
                                            className={`input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.lugar ? 'is-invalid' : ''}`}
                                            placeholder='lugar'
                                            type="text"
                                            maxLength={40}
                                            onChange={(e) => setValue(`formacion[${index}].lugar`, e.target.value)}
                                            {...register(`formacion[${index}].lugar`, {required: true, maxLength: 40})}
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
                    <div className="text-center">
                        <button type='button' className="position-relative btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={handleAddFormacion}>
                            Añadir formación
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                </motion.form>
            </div>
            <div className="row d-flex justify-content-center align-items-center ">
                <div className="col text-md-start">
                    <button onClick={back} className="btn btn-small btn-white btn-hover-animation-switch btn-icon-left d-table d-lg-inline-block md-mx-auto">
                        <span>
                            <span className="btn-text">Volver</span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-left"></i></span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-left"></i></span>
                        </span>
                    </button>
                </div>
                <div className="col text-md-end">
                    <button onClick={onClickNext} className="btn btn-small btn-white btn-hover-animation-switch d-table d-lg-inline-block md-mx-auto">
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

export default Formacion;
