import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const { registerContext, isAuthenticated, errors: errorsRegister, loginGoogleContext } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/gestionar');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        registerContext(values);
    });

    const googleAuth = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      loginGoogleContext(access_token);
    },
  });

    return (
        <>
            <section className='full-screen d-flex align-items-center bg-black'>
                <div className="container">
                    <div className="row g-0 justify-content-center">
                        <motion.div className="col-xl-4 col-lg-5 col-md-10 contact-form-style-04 md-mb-50px" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <span className="fs-26 xs-fs-24 alt-font fw-600 text-dark-gray mb-20px d-block text-white">Crear una cuenta</span>
                            <form action="" onSubmit={onSubmit}>
                                <label className="text-dark-gray mb-10px fw-500 text-white">Nombre de usuario<span className="text-red">*</span></label>
                                <input className={`border-radius-4px border-color-white bg-black form-control ${errors.username ? 'is-invalid' : ''}`} type="text" placeholder="Introduce tu nombre de usuario" {...register('username', { required: true })} autoComplete="username" />
                                <span className='m-20px mb-20px text-red'>{errors.username && 'Introduce tu nombre de usuario'}</span><br />

                                <label className="text-dark-gray mb-10px fw-500 text-white">Email<span className="text-red">*</span></label>
                                <input className={`border-radius-4px border-color-white bg-black form-control ${errors.email ? 'is-invalid' : ''}`} type="email" placeholder="Introduce tu email" {...register('email', { required: true })} autoComplete="email" />
                                <span className='m-20px mb-20px text-red'>{errors.email && 'Introduce tu email'}</span><br />

                                <label className="text-dark-gray mb-10px fw-500 text-white">Contraseña<span className="text-red">*</span></label>
                                <input className={`border-radius-4px border-color-white bg-black form-control ${errors.password ? 'is-invalid' : ''}`} type="password" placeholder="Introduce tu contraseña" {...register('password', { required: true })} autoComplete="current-password" />
                                <span className='m-20px mb-20px text-red'>{errors.password && 'Introduce tu contraseña'}</span><br />

                                <div className="position-relative terms-condition-box text-start d-flex align-items-center mb-20px">
                                    <Link to="/login" className="fs-14 text-dark-gray fw-500 text-decoration-line-bottom ms-auto text-white">Ya tienes una cuenta?</Link>
                                </div>

                                <div className="col-12 alert-box-style-03">
                                    {
                                        errorsRegister.map((error, i) => (
                                            <div key={i} className="alert alert-danger alert-dismissable text-white">
                                                {error}
                                            </div>
                                        ))
                                    }
                                </div>

                                <button className="btn btn-medium btn-round-edge btn-base-color btn-box-shadow w-100 text-transform-none" type="submit">Registrarse</button>
                                <div className="form-results mt-20px d-none"></div>
                            </form>
                            <div className="position-relative terms-condition-box d-flex justify-content-center align-items-center mb-20px mt-20px">
                                <div className="fs-14 text-dark-gray fw-500 text-center text-white">O regístrate con</div>
                            </div>
                            <button onClick={googleAuth} className="btn btn-small btn-transparent-white btn-box-shadow w-100 text-transform-none"><i className='fa-brands fa-google'></i></button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterPage;