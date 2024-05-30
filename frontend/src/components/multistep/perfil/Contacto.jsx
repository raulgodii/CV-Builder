import { useForm } from 'react-hook-form';
import { useCv } from '../../../context/CvContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function Contacto() {
    const { data, updateCv, next, back } = useCv();

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ defaultValues: data, mode: 'onChange' });

    useEffect(() => {
        // console.log(data);
    }, [data]);

    const onChange = () => {
        const newData = getValues();
        const updatedPerfil = {
            ...data.perfil,
            ...newData.perfil
        };

        const updatedData = {
            ...data,
            perfil: updatedPerfil
        };

        updateCv(updatedData);
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
                    <h6 className="fw-700 alt-font text-white ls-minus-2px">Datos de contacto</h6>
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
                        <label className="text-white fw-500">Teléfono<span className="text-red">*</span></label>
                        <input className={`input-name bg-black border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.contacto?.telefono ? 'is-invalid' : ''}`} type="text" placeholder="Teléfono" {...register("perfil.contacto.telefono", { required: true, pattern: /^[0-9]+$/, minLength: 7, maxLength: 15 })} />
                    </motion.div>
                    <motion.div variants={childVariants} className="col-md-6 mb-30px position-relative form-group">
                        <label className="text-white fw-500">Email<span className="text-red">*</span></label>
                        <input className={`input-name bg-black border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.contacto?.email ? 'is-invalid' : ''}`} type="email" placeholder="Email" {...register("perfil.contacto.email", { required: true, pattern: /^\S+@\S.\S+$/ })} />
                    </motion.div>
                    <motion.div variants={childVariants} className="col-md-12 mb-30px">
                        <label className="text-white fw-500">Dirección<span className="text-red">*</span></label>
                        <input maxLength={50} className={`bg-black border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.contacto?.direccion ? 'is-invalid' : ''}`} type="text" placeholder="Dirección" {...register("perfil.contacto.direccion", { required: true, maxLength: 50 })} />
                    </motion.div>
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
    )
}

export default Contacto