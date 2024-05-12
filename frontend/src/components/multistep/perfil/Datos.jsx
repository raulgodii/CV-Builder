import { useForm } from 'react-hook-form';
import { useCv } from '../../../context/CvContext';
import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip'
import { motion } from 'framer-motion';

function Datos() {
    const { data, updateData, next } = useCv();

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ defaultValues: data, mode: 'onChange' });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = () => {
        const newData = getValues();
        console.log(newData)
        const updatedPerfil = {
            ...data.perfil,
            ...newData.perfil
        };

        const updatedData = {
            ...data,
            perfil: updatedPerfil
        };

        updateData(updatedData);
    };

    const onClickNext = handleSubmit(() => {
        next();
    });

    const childVariants = {
        hidden: { opacity: 0, translateY: 30 },
        visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <>
            <div className="col-xl-10 col-lg-12">
                <div className=" text-center">
                    <h6 className="fw-700 alt-font text-dark-gray ls-minus-2px">Datos personales</h6>
                </div>
                <motion.form onChange={onChange} className="row contact-form-style-02" initial="hidden" animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.25
                            }
                        }
                    }}>
                    <motion.div variants={childVariants} className="col-md-6 mb-30px position-relative form-group">
                        <label className="text-dark-gray fw-500">Nombre*</label>
                        <input className={`input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.nombre ? 'is-invalid' : ''}`} type="text" placeholder="Nombre" {...register("perfil.nombre", { required: true, pattern: /^[^\d]+$/ })} />
                    </motion.div>
                    <motion.div variants={childVariants} className="col-md-6 mb-30px position-relative form-group">
                        <label className="text-dark-gray fw-500">Primer apellido*</label>
                        <input className={`input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.primer_apellido ? 'is-invalid' : ''}`} type="text" placeholder="Primer apellido" {...register("perfil.primer_apellido", { required: true, pattern: /^[^\d]+$/ })} />
                    </motion.div>
                    <motion.div variants={childVariants} className="col-md-6 mb-30px">
                        <label className="text-dark-gray fw-500">Profesión* <span data-tooltip-id="profesion-tooltip" ><i className="fa-solid fa-circle-exclamation"></i></span></label>
                        <input className={`border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.profesion ? 'is-invalid' : ''}`} type="text" placeholder="Profesión" {...register("perfil.profesion", { required: true, pattern: /^[^\d]+$/ })} />
                    </motion.div>
                    <Tooltip id="profesion-tooltip" className='tooltip text-start'>
                        <span className="fw-700 fs-17 text-white">Recuerda</span>
                        <p className="fs-15 mb-10px">Escribe tu profesión o el nombre de tu sector en pocas palabras</p>
                    </Tooltip>

                    <motion.div variants={childVariants} className="col-md-6 mb-30px">
                        <label className="text-dark-gray fw-500">Fecha de nacimiento</label>
                        <input className={`form-control border-radius-4px border-color-white box-shadow-double-large ${errors?.perfil?.fecha_nacimiento ? 'is-invalid' : ''}`} type="date" aria-label="date" {...register("perfil.fecha_nacimiento", { required: true })} />
                    </motion.div>
                    <motion.div variants={childVariants} className="col-md-12 mb-30px ">
                        <label className="text-dark-gray fw-500">Descripción sobre ti <span data-tooltip-id="descripcion-tooltip"><i className="fa-solid fa-circle-question"></i></span></label>
                        <input className={`input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.descripcion ? 'is-invalid' : ''}`} type="text" placeholder="Descríbete en una frase" {...register("perfil.descripcion", { required: true })} />
                    </motion.div>
                    <Tooltip id="descripcion-tooltip" className='tooltip text-start'>
                        <p className="fs-15 mb-10px">Describete en una frase</p>
                        <span className="fs-12 text-decoration-underline">Ejemplo: </span>
                        <p className="fs-12 mb-10px text-center">"Especialista en desarrollo de negocio con experiencia en identificar oportunidades de crecimiento y establecer alianzas estratégicas."</p>
                    </Tooltip>
                </motion.form>
            </div >

            <div className="row d-flex justify-content-center align-items-center ">
                <div className="col text-md-start"></div>
                <div className="col text-md-end">
                    <button onClick={onClickNext} className="btn btn-small btn-transparent-base-color btn-hover-animation-switch d-table d-lg-inline-block md-mx-auto">
                        <span>
                            <span className="btn-text">Siguiente</span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Datos