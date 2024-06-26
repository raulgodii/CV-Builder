import { useForm, useFieldArray } from 'react-hook-form';
import { useCv } from '../../../context/CvContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Idiomas() {
    const { data, updateCv, back, cvId } = useCv();

    const { register, control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ defaultValues: data, mode: 'onChange' });

    const { fields, append, remove } = useFieldArray({ control, name: 'idiomas' });

    const navigate = useNavigate();

    const onChange = () => {
        const newData = getValues();
        const updatedData = {
            ...data,
            idiomas: newData.idiomas
        };
        updateCv(updatedData);
    };

    const onClickNext = handleSubmit(() => {
        navigate('/gestionar/' + cvId);
    })

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
                    <h6 className="fw-700 alt-font text-white ls-minus-2px">Idiomas</h6>
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

                    {fields.map((idioma, index) => (
                        <>
                            <motion.div key={idioma.id} variants={childVariants} className="row form-group border border-radius-4px border-color-dark-gray m-3 py-3 bg-gradient-dark-gray-left-transparent">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <div onClick={() => handleRemoveIdioma(index)} className="border-color-red text-danger border border-color-extra-medium-gray slider-one-slide-next-1 swiper-button-next slider-navigation-style-04 m-0">
                                        <i className="feather icon-feather-trash-2"></i>
                                    </div>
                                </div>
                                <div className="col-9 row d-flex align-items-center justify-content-center">
                                    <div className='col-md-8 p-2'>
                                        <input maxLength={15} className={`bg-black input-name border-radius-4px border-color-white box-shadow-double-large form-control ${errors?.idiomas?.[index]?.titulo ? 'is-invalid' : ''}`} type="text" placeholder="Idioma"
                                            onChange={(e) => setValue(`idiomas[${index}].titulo`, e.target.value)}
                                            {...register(`idiomas[${index}].titulo`, { required: true, maxLength: 15 })} />
                                    </div>
                                    <div className='col-md-4 p-2'>
                                        <div className="select">
                                            <select className={`bg-black form-control border-color-white box-shadow-double-large ${errors?.idiomas?.[index]?.nivel ? 'is-invalid' : ''}`} name="select" onChange={(e) => setValue(`idiomas[${index}].nivel`, e.target.value)}
                                                {...register(`idiomas[${index}].nivel`, { required: true })}>
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
                    <div className="text-center">
                        <button type='button' className="position-relative btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={handleAddIdioma}>
                            Añadir Idioma
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
                            <span className="btn-text">Finalizar</span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Idiomas;
