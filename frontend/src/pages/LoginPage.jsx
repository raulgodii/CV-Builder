import { useForm, useFieldArray } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginContext, isAuthenticated, errors: errorsLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(data => {
    loginContext(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  //   const loadScripts = () => {
  //     // Crear y cargar el script de jQuery
  //     const scriptjQuery = document.createElement('script');
  //     scriptjQuery.src = '/js/jquery.js'; // Ruta relativa al directorio public
  //     scriptjQuery.async = true;
  //     scriptjQuery.onload = loadVendorsScript;
  //     document.body.appendChild(scriptjQuery);
  //   };

  //   const loadVendorsScript = () => {
  //     // Crear y cargar el script de vendors.min.js
  //     const scriptVendors = document.createElement('script');
  //     scriptVendors.src = '/js/vendors.min.js'; // Ruta relativa al directorio public
  //     scriptVendors.async = true;
  //     scriptVendors.onload = loadMainScript;
  //     document.body.appendChild(scriptVendors);
  //   };

  //   const loadMainScript = () => {
  //     // Crear y cargar el script de main.js
  //     const scriptMain = document.createElement('script');
  //     scriptMain.src = '/js/main.js'; // Ruta relativa al directorio public
  //     scriptMain.async = true;
  //     document.body.appendChild(scriptMain);
  //   };

  //   loadScripts();

  //   // Eliminar los scripts cuando el componente se desmonte
  //   return () => {
  //     document.body.removeChild(scriptjQuery);
  //     document.body.removeChild(scriptVendors);
  //     document.body.removeChild(scriptMain);
  //   };
  // }, []);

  return (
    <>
      <section className='full-screen d-flex align-items-center'>
        <div className="container">
          <div className="row g-0 justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-10 contact-form-style-04 md-mb-50px" data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":100, "staggervalue": 150, "easing": "easeOutQuad" }'>
              <span className="fs-26 xs-fs-24 alt-font fw-600 text-dark-gray mb-20px d-block">Iniciar sesión</span>
              <form action="" onSubmit={onSubmit}>
                <label className="text-dark-gray mb-10px fw-500">Email<span className="text-red">*</span></label>
                <input className={` bg-very-light-gray form-control ${errors.email ? 'is-invalid' : ''}`} type="email" placeholder="Introduce tu email" {...register('email', { required: true })} />
                <span className='m-20px mb-20px text-red'>{errors.email && 'Introduce tu email'}</span><br />

                <label className="text-dark-gray mb-10px fw-500">Contraseña<span className="text-red">*</span></label>
                <input className={`bg-very-light-gray form-control ${errors.password ? 'is-invalid' : ''}`} type="password" placeholder="Introduce tu contraseña" {...register('password', { required: true })} />
                <span className='m-20px mb-20px text-red'>{errors.password && 'Introduce tu contraseña'}</span><br />

                <div className="position-relative terms-condition-box text-start d-flex align-items-center mb-20px">
                  <Link to="/register" className="fs-14 text-dark-gray fw-500 text-decoration-line-bottom ms-auto">Aún no te has registrado?</Link>
                </div>

                <div className="col-12 alert-box-style-03">
                  {
                    errorsLogin.map((error, i) => (
                      <div key={i} className="alert alert-danger alert-dismissable text-white">
                        {error}
                      </div>
                    ))
                  }
                </div>

                <button className="btn btn-medium btn-round-edge btn-base-color btn-box-shadow w-100 text-transform-none" type="submit">Iniciar sesión</button>
                <div className="form-results mt-20px d-none"></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;