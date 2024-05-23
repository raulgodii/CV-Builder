import { useForm, useFieldArray } from 'react-hook-form';
import { useCv } from '../../../context/CvContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
        append({ titulo: '', fecha_inicio: '', fecha_fin: '', lugar: '', actualidad: false }); // Añadir nuevo campo de formacion al array
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

    const getValidationRules = (index) => ({
        required: !getValues(`formacion[${index}].actualidad`)
    });

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
                            {/* <motion.div key={formacion.id} variants={childVariants} className="row form-group border border-radius-4px border-color-dark-gray m-3 py-3 bg-gradient-dark-gray-left-transparent">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <div onClick={() => handleRemoveFormacion(index)} className="border-color-red text-danger slider-one-slide-next-1 border border-color-extra-medium-gray text-dark-gray swiper-button-next slider-navigation-style-04 m-0">
                                        <i className="feather icon-feather-trash-2"></i>
                                    </div>
                                </div>
                                <div className="col-9 row d-flex align-items-center justify-content-center">
                                    <div className='col p-2'>
                                        <label class="form-label fw-700 text-dark-gray text-uppercase fs-13 ls-05px mb-0 text-white">Puesto</label>
                                        <input
                                            className={`bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.titulo ? 'is-invalid' : ''}`}
                                            placeholder='titulo'
                                            type="text"
                                            maxLength={25}
                                            onChange={(e) => setValue(`formacion[${index}].titulo`, e.target.value)}
                                            {...register(`formacion[${index}].titulo`, { required: true, maxLength: 25 })}
                                        />
                                    </div>
                                    <div className='col p-2'>
                                        <label class="form-label fw-700 text-dark-gray text-uppercase fs-13 ls-05px mb-0 text-white">Desde</label>
                                        <input
                                            className={`date-icon bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.fecha ? 'is-invalid' : ''}`}
                                            type="date"
                                            onChange={(e) => setValue(`formacion[${index}].fecha`, e.target.value)}
                                            {...register(`formacion[${index}].fecha`, { required: true })}
                                        />
                                    </div>
                                    <div className='col p-2'>
                                        <label class="form-label fw-700 text-dark-gray text-uppercase fs-13 ls-05px mb-0 text-white">Lugar</label>
                                        <input
                                            className={`bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.lugar ? 'is-invalid' : ''}`}
                                            placeholder='lugar'
                                            type="text"
                                            maxLength={40}
                                            onChange={(e) => setValue(`formacion[${index}].lugar`, e.target.value)}
                                            {...register(`formacion[${index}].lugar`, { required: true, maxLength: 40 })}
                                        />
                                    </div>
                                </div>
                            </motion.div> */}
                            <motion.div key={formacion.id} variants={childVariants} className="row form-group border border-radius-4px border-color-dark-gray m-3 py-3 bg-gradient-dark-gray-left-transparent">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <div onClick={() => handleRemoveFormacion(index)} className="border-color-red text-danger slider-one-slide-next-1 border border-color-extra-medium-gray text-dark-gray swiper-button-next slider-navigation-style-04 m-0">
                                        <i className="feather icon-feather-trash-2"></i>
                                    </div>
                                </div>
                                <div className="col-9 row">
                                    <div className='col-md-6 p-2'>
                                        <label className="form-label fw-700 text-dark-gray text-uppercase fs-13 ls-05px mb-0 text-white">Puesto</label>
                                        <input
                                            className={`bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.titulo ? 'is-invalid' : ''}`}
                                            placeholder='titulo'
                                            type="text"
                                            maxLength={25}
                                            onChange={(e) => setValue(`formacion[${index}].titulo`, e.target.value)}
                                            {...register(`formacion[${index}].titulo`, { required: true, maxLength: 25 })}
                                        />
                                    </div>
                                    <div className='col-md-6 p-2'>
                                        <label className="form-label fw-700 text-dark-gray text-uppercase fs-13 ls-05px mb-0 text-white">Lugar</label>
                                        <input
                                            className={`bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.lugar ? 'is-invalid' : ''}`}
                                            placeholder='lugar'
                                            type="text"
                                            maxLength={40}
                                            onChange={(e) => setValue(`formacion[${index}].lugar`, e.target.value)}
                                            {...register(`formacion[${index}].lugar`, { required: true, maxLength: 40 })}
                                        />
                                    </div>
                                    <div className='col-md-6 p-2'>
                                        <label className="form-label fw-700 text-dark-gray text-uppercase fs-13 ls-05px mb-0 text-white">Desde</label>
                                        <input
                                            className={`date-icon bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.fecha_inicio ? 'is-invalid' : ''}`}
                                            type="date"
                                            onChange={(e) => setValue(`formacion[${index}].fecha_inicio`, e.target.value)}
                                            {...register(`formacion[${index}].fecha_inicio`, { required: true })}
                                        />
                                    </div>
                                    <div className='col-md-6 p-2'>
                                        <label className="form-label fw-700 text-dark-gray text-uppercase fs-13 ls-05px mb-0 text-white">Hasta</label>
                                        {
                                            getValues(`formacion[${index}].actualidad`) ?
                                                <input
                                                    className={`date-icon bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.experiencia?.[index]?.fecha_fin ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    value={"Actualidad"}
                                                    readOnly
                                                />
                                                :
                                                <input
                                                    disabled={getValues(`formacion[${index}].actualidad`)}
                                                    className={`date-icon bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.formacion?.[index]?.fecha_fin ? 'is-invalid' : ''} ${getValues(`formacion[${index}].actualidad`) ? 'disabled' : ''}`}
                                                    type="date"
                                                    onChange={(e) => setValue(`formacion[${index}].fecha_fin`, e.target.value)}
                                                    {...register(`formacion[${index}].fecha_fin`, getValidationRules(index))}
                                                />
                                        }

                                        <div class="position-relative terms-condition-box ms-5 text-white d-inline-block mt-2">
                                            <label>
                                                <input type="checkbox" class="check-box align-middle border-color-white" {...register(`formacion[${index}].actualidad`)} onChange={(e) => setValue(`formacion[${index}].actualidad`, e.target.checked)} />
                                                <span class="box fs-14">Actualidad</span>
                                            </label>
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
