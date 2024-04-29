import { useForm } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function Contacto() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data, updateData } = useMultiStep();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = (newData) => {
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
                <h6 className="fw-700 alt-font text-dark-gray ls-minus-2px">Datos de contacto</h6>
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
                    <label className="text-dark-gray fw-500">Teléfono</label>
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="number" placeholder="Teléfono" {...register("perfil.contacto.telefono")} value={data.perfil.contacto.telefono} />
                </motion.div>
                <motion.div variants={childVariants} className="col-md-6 mb-30px position-relative form-group">
                    <label className="text-dark-gray fw-500">Email</label>
                    <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="email" placeholder="Email" {...register("perfil.contacto.email")} value={data.perfil.contacto.email} />
                </motion.div>
                <motion.div variants={childVariants} className="col-md-12 mb-30px">
                    <label className="text-dark-gray fw-500">Dirección </label>
                    <input className="border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Dirección" {...register("perfil.contacto.direccion")} value={data.perfil.contacto.direccion} />
                </motion.div>
            </motion.form>
        </div>
    )
}

export default Contacto