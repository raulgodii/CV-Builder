import { useForm } from 'react-hook-form';
import { useCv } from '../../../context/CvContext';
import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip'
import { motion } from 'framer-motion';
import { useState } from 'react';


function Datos() {
    const { data, updateCv, next, uploadFoto, deleteFoto } = useCv();

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ defaultValues: data, mode: 'onChange' });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = async () => {
        const newData = getValues();
        console.log(newData)

        if (newData.perfil.foto && (newData.perfil.foto instanceof FileList) && newData.perfil.foto.length > 0) {
            console.log(newData.perfil.foto)
            const file = newData.perfil.foto[0];
            const res = await uploadFoto(file);
            newData.perfil.foto = res;
        }

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

    const handleDeleteFoto = async () => {
        try {
            await deleteFoto(data.perfil.foto);

            const newData = getValues();

            newData.perfil.foto = null;

            const updatedPerfil = {
                ...data.perfil,
                ...newData.perfil
            };

            const updatedData = {
                ...data,
                perfil: updatedPerfil
            };

            updateCv(updatedData);
        } catch (error) {
            console.error('Error al eliminar la foto:', error);
        }
    };

    const childVariants = {
        hidden: { opacity: 0, translateY: 30 },
        visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <>
            <div className="col-xl-10 col-lg-12">
                <div className=" text-center">
                    <h6 className="fw-700 alt-font text-white ls-minus-2px">Datos personales</h6>
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
                        <label className="text-white fw-500">Nombre<span className="text-red">*</span></label>
                        <input maxLength={15} className={`input-name bg-black border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.nombre ? 'is-invalid' : ''}`} type="text" placeholder="Nombre" {...register("perfil.nombre", { required: true, pattern: /^[^\d]+$/, maxLength: 15 })} />
                    </motion.div>
                    <motion.div variants={childVariants} className="col-md-6 mb-30px position-relative form-group">
                        <label className="text-white fw-500">Primer apellido<span className="text-red">*</span></label>
                        <input maxLength={20} className={`bg-black border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.primer_apellido ? 'is-invalid' : ''}`} type="text" placeholder="Primer apellido" {...register("perfil.primer_apellido", { required: true, pattern: /^[^\d]+$/, maxLength: 20 })} />
                    </motion.div>
                    <motion.div variants={childVariants} className="col-md-6 mb-30px">
                        <label className="text-white fw-500">Profesión<span className="text-red">*</span> <span data-tooltip-id="profesion-tooltip" ><i className="fa-solid fa-circle-exclamation"></i></span></label>
                        <input maxLength={20} className={`bg-black border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.profesion ? 'is-invalid' : ''}`} type="text" placeholder="Profesión" {...register("perfil.profesion", { required: true, pattern: /^[^\d]+$/, maxLength: 20 })} />
                    </motion.div>
                    <Tooltip id="profesion-tooltip" className='tooltip text-start'>
                        <span className="fw-700 fs-17 text-white">Recuerda</span>
                        <p className="fs-15 mb-10px">Escribe tu profesión o el nombre de tu sector en pocas palabras</p>
                    </Tooltip>

                    <motion.div variants={childVariants} className="col-md-6 mb-30px">
                        <label className="text-white fw-500">Fecha de nacimiento<span className="text-red">*</span></label>
                        <input className={`form-control bg-black border-radius-4px border-color-white box-shadow-double-large ${errors?.perfil?.fecha_nacimiento ? 'is-invalid' : ''}`} type="date" aria-label="date" {...register("perfil.fecha_nacimiento", { required: true })} />
                    </motion.div>
                    <motion.div variants={childVariants} className="col-md-12 mb-30px ">
                        <label className="text-white fw-500">Descripción sobre ti<span className="text-red">*</span> <span data-tooltip-id="descripcion-tooltip"><i className="fa-solid fa-circle-question"></i></span></label>
                        <input maxLength={250} className={`input-name bg-black border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.perfil?.descripcion ? 'is-invalid' : ''}`} type="text" placeholder="Descríbete en una frase" {...register("perfil.descripcion", { required: true, maxLength: 250 })} />
                    </motion.div>
                    <Tooltip id="descripcion-tooltip" className='tooltip text-start'>
                        <p className="fs-15 mb-10px">Describete en una frase</p>
                        <span className="fs-12 text-decoration-underline">Ejemplo: </span>
                        <p className="fs-12 mb-10px text-center">"Especialista en desarrollo de negocio con experiencia en identificar oportunidades de crecimiento y establecer alianzas estratégicas."</p>
                    </Tooltip>
                    {/* <motion.div variants={childVariants} className="col-md-12 mb-30px">
                        <label className="text-dark-gray fw-500">Foto*</label>
                        <input className={`form-control border-radius-4px border-color-white box-shadow-double-large ${errors?.perfil?.foto ? 'is-invalid' : ''}`} type="file" accept="image/*" aria-label="file" {...register("perfil.foto", { required: true })} />
                    </motion.div> */}
                    {/* <motion.div variants={childVariants} className="col-md-12 mb-30px">
                        <div style={backgroundImageStyle}></div>
                    </motion.div> */}

                    <motion.div variants={childVariants} class="row">
                        <div class="col-12">
                            <div class="d-block d-md-flex w-100 align-items-center sm-p-35px mb-4">
                                {data.perfil.foto ?
                                    <div class="w-75 sm-w-100 text-md-start last-paragraph-no-margin mb-4">
                                        <label className="text-white fw-500">Foto</label>
                                        <input hidden id='file' accept=".png, .jpg, .jpeg" className={`bg-black form-control border-radius-4px border-color-white box-shadow-double-large ${errors?.perfil?.foto ? 'is-invalid' : ''}`} type="file" aria-label="file" {...register("perfil.foto")} />
                                        <div className='d-flex'>
                                            <label htmlFor="file" class="btn btn-very-small btn-switch-text btn-transparent-white d-table d-lg-inline-block lg-mb-15px w-100">
                                                <span>
                                                    <span class="mx-3 btn-double-text" data-text="Cambiar foto">Cambiar foto</span>
                                                    <span><i class="fa-solid fa-pen"></i></span>
                                                </span>
                                            </label>
                                            <label onClick={handleDeleteFoto} class="mx-3 btn btn-very-small btn-switch-text btn-transparent-white d-table d-lg-inline-block lg-mb-15px w-100">
                                                <span>
                                                    <span class="btn-double-text" data-text="Eliminar foto">Eliminar foto</span>
                                                    <span><i class="fa-solid fa-xmark"></i></span>
                                                </span>
                                            </label>
                                        </div>
                                    </div> :
                                    <div class="w-75 sm-w-100 text-md-start last-paragraph-no-margin mb-4">
                                        <label className="text-white fw-500">Foto</label>
                                        <input accept=".png, .jpg, .jpeg" className={`bg-black form-control border-radius-4px border-color-white box-shadow-double-large ${errors?.perfil?.foto ? 'is-invalid' : ''}`} type="file" aria-label="file" {...register("perfil.foto")} />
                                    </div>
                                }
                                <div class="text-center mx-5">
                                    <img src={data.perfil.foto ? "http://localhost:3000/api/cv/files/" + data.perfil.foto : "https://via.placeholder.com/200x200"} class="rounded-circle w-120px h-120px object-fit-cover" alt="" data-no-retina="" />
                                    <span class="fs-15 lh-20 d-block sm-mb-15px mt-20px">{data.perfil.foto ? '' : 'Sin foto de perfil'}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.form>
            </div >

            <div className="row d-flex justify-content-center align-items-center ">
                <div className="col text-md-start"></div>
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

export default Datos