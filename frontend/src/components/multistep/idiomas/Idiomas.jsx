import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStep } from '../../../context/MultiStepContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function Idiomas() {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { data, updateData } = useMultiStep();
    const { fields, append, remove } = useFieldArray({ control, name: 'idiomas' });

    useEffect(() => {
        console.log(data);
        // Agregar campos preexistentes a fields
        data.idiomas.forEach((idioma) => {
            append(idioma);
        });
    }, []);

    const onChange = (newData) => {
        const updatedData = {
            ...data,
            idiomas: newData.idiomas
        };
        updateData(updatedData);
    };

    const handleAddIdioma = () => {
        append({ titulo: '', nivel: '' }); // Añadir nuevo campo de idioma al array
    };

    const handleRemoveIdioma = (index) => {
        remove(index); // Eliminar campo de idioma del array

        const newIdiomas = [...data.idiomas];
        newIdiomas.splice(index, 1);
        const updatedData = {
            ...data,
            idiomas: newIdiomas
        };
        updateData(updatedData);
    };

    const childVariants = {
        hidden: { opacity: 0, translateY: 30 },
        visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        // <form onChange={handleSubmit(onChange)}>
        //     <h4>Idiomas</h4>

        //     {fields.map((idioma, index) => (
        //         <div key={idioma.id}>
        //             <label>Idioma {index + 1}:</label>
        //             <input
        //                 type="text"
        //                 defaultValue={idioma.titulo}
        //                 onChange={(e) => setValue(`idiomas[${index}].titulo`, e.target.value)}
        //                 {...register(`idiomas[${index}].titulo`)}
        //             />
        //             <input
        //                 type="text"
        //                 defaultValue={idioma.nivel}
        //                 onChange={(e) => setValue(`idiomas[${index}].nivel`, e.target.value)}
        //                 {...register(`idiomas[${index}].nivel`)}
        //             />
        //             <button type="button" onClick={() => handleRemoveIdioma(index)}>
        //                 Eliminar
        //             </button>
        //         </div>
        //     ))}

        //     <button type="button" onClick={handleAddIdioma}>
        //         Añadir idioma
        //     </button>
        // </form>
        <>
            <div className="col-xl-10 col-lg-12">
                <div className=" text-center">
                    <h6 className="fw-700 alt-font text-dark-gray ls-minus-2px">Idiomas</h6>
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

                    {fields.map((idioma, index) => (
                        <>
                            <motion.div key={idioma.id} variants={childVariants} className="row form-group">
                                <div className="col-3 mb-30px d-flex align-items-center justify-content-center">
                                    <div onClick={() => handleRemoveIdioma(index)} className="slider-one-slide-next-1 bg-white border border-color-extra-medium-gray text-dark-gray swiper-button-next slider-navigation-style-04">
                                        <i className="feather icon-feather-trash-2"></i>
                                    </div>
                                </div>
                                <div className="col-9 row d-flex align-items-center justify-content-center">
                                    <div className='col-md-8 mb-30px'>
                                        <input className="input-name border-radius-4px border-color-white box-shadow-double-large form-control" type="text" placeholder="Idioma"
                                            defaultValue={idioma.titulo}
                                            onChange={(e) => setValue(`idiomas[${index}].titulo`, e.target.value)}
                                            {...register(`idiomas[${index}].titulo`)} />
                                    </div>
                                    <div className='col-md-4 mb-30px'>
                                        <div class="select">
                                            <select class="form-control border-color-white box-shadow-double-large" name="select" defaultValue={idioma.nivel} onChange={(e) => setValue(`idiomas[${index}].nivel`, e.target.value)}
                                                {...register(`idiomas[${index}].nivel`)}>
                                                <option value="" selected hidden>Nivel</option>
                                                <option value="A1">A1</option>
                                                <option value="A2">A2</option>
                                                <option value="B1">B1</option>
                                                <option value="B2">B2</option>
                                                <option value="C1">C1</option>
                                                <option value="C2">C2</option>
                                                <option value="Nativo">Nativo</option>
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
                                <p>No se han añadido idiomas</p>
                            </div>
                        </motion.div>
                    }
                    <div class="text-center">
                        <button type='button' class="position-relative btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={handleAddIdioma}>
                            Añadir Idioma
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                </motion.form>
            </div>
        </>
    );
}

export default Idiomas;
