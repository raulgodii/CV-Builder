import { useForm } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip'
import { motion } from 'framer-motion';

function Datos() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data, updateData } = useMultiStep();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = (newData) => {
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

    const childVariants = {
        hidden: { opacity: 0, translateY: 30 },
        visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <div className="col-xl-10 col-lg-12">
            <div className=" text-center">
                <h6 className="fw-700 alt-font text-dark-gray ls-minus-2px">Datos personales</h6>
            </div>
            <motion.form onChange={handleSubmit(onChange)} className="row contact-form-style-02" initial="hidden" animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.25
                        }
                    }
                }}>
                <motion.div variants={childVariants} className="col-md-6 mb-30px position-relative form-group">
                    <label className="text-dark-gray fw-500">Nombre</label>
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Nombre" {...register("perfil.nombre")} value={data.perfil.nombre} />
                </motion.div>
                <motion.div variants={childVariants} className="col-md-6 mb-30px position-relative form-group">
                    <label className="text-dark-gray fw-500">Primer apellido</label>
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Primer apellido" {...register("perfil.primer_apellido")} value={data.perfil.primer_apellido} />
                </motion.div>
                <motion.div variants={childVariants} className="col-md-6 mb-30px">
                    <label className="text-dark-gray fw-500">Profesión <span data-tooltip-id="profesion-tooltip" ><i className="fa-solid fa-circle-exclamation"></i></span></label>
                    <input className="border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Profesión" {...register("perfil.profesion")} value={data.perfil.profesion} />
                </motion.div>
                <Tooltip id="profesion-tooltip" className='tooltip text-start'>
                    <span className="fw-700 fs-17 text-white">Recuerda</span>
                    <p className="fs-15 mb-10px">Escribe tu profesión o el nombre de tu sector en pocas palabras</p>
                </Tooltip>

                <motion.div variants={childVariants} className="col-md-6 mb-30px">
                    <label className="text-dark-gray fw-500">Fecha de nacimiento</label>
                    <input className="form-control border-radius-4px border-color-white box-shadow-double-large" type="date" aria-label="date" {...register("perfil.fecha_nacimiento")} value={data.perfil.fecha_nacimiento} />
                </motion.div>
                <motion.div variants={childVariants} className="col-md-12 mb-30px ">
                    <label className="text-dark-gray fw-500">Descripción sobre ti <span data-tooltip-id="descripcion-tooltip"><i className="fa-solid fa-circle-question"></i></span></label>
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Descríbete en una frase" {...register("perfil.descripcion")} value={data.perfil.descripcion} />
                </motion.div>
                <Tooltip id="descripcion-tooltip" className='tooltip text-start'>
                    <p className="fs-15 mb-10px">Describete en una frase</p>
                    <span className="fs-12 text-decoration-underline">Ejemplo: </span>
                    <p className="fs-12 mb-10px text-center">"Especialista en desarrollo de negocio con experiencia en identificar oportunidades de crecimiento y establecer alianzas estratégicas."</p>
                </Tooltip>
            </motion.form>
        </div >
    )
}

export default Datos