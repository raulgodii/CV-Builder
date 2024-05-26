import { useResend } from "../context/ResendContext"
import { useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAnimateOnScroll } from "../components/useAnimateOnScroll";

function HomePage() {
  const { sendEmail } = useResend();
  const { parentRef, control } = useAnimateOnScroll(0.5);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/gestionar');
  }, [isAuthenticated]);

  return (
    <>
      <section className="p-0 cover-background full-screen ipad-top-space-margin md-h-auto position-relative md-pb-70px bg-black">
        <div id="particles-style-01" className="h-100 position-absolute left-0px top-0 w-100" data-particle="true" data-particle-options={`{"particles": {"number": {"value": 12,"density": {"enable": true,"value_area": 2000}},"color": {"value": ["#8f76f5", "#a65cef", "#c74ad2", "#e754a4", "#ff6472"]},"shape": {"type": "circle","stroke":{"width":0,"color":"#000000"}},"opacity": {"value": 0.3,"random": false,"anim": {"enable": false,"speed": 1,"sync": false}},"size": {"value": 8,"random": true,"anim": {"enable": false,"sync": true}},"line_linked":{"enable":false,"distance":0,"color":"#ffffff","opacity":0.4,"width":1},"move": {"enable": true,"speed":1,"direction": "right","random": false,"straight": false}},"interactivity": {"detect_on": "canvas","events": {"onhover": {"enable": false,"mode": "repulse"},"onclick": {"enable": false,"mode": "push"},"resize": true}},"retina_detect": false}`}><canvas className="particles-js-canvas-el" width="1656" height="1253" style={{ width: "100%", height: "100%" }}></canvas></div>
        <div className="container h-100 position-relative z-index-9">
          <div className="row align-items-center h-100 justify-content-center">
            <motion.div className="col-lg-6 col-md-10 text-center position-relative md-mb-50px appear anime-child anime-complete" initial={{ opacity: 0, translateY: 80 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 80 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.075, 0.82, 0.165, 1],
              }}>
              <div className="d-inline-block" style={{}}>
                <div className="text-end w-90 lg-w-80 ms-auto animation-float">
                  <img src="../../public/images/mockup1.png" alt="" data-no-retina="" />
                </div>
              </div>
              <div className="w-60 position-absolute left-minus-40px lg-left-minus-30px xs-left-15px xs-w-50 bottom-minus-50px mb-30 xs-mb-15" style={{}}>
                <img src="https://via.placeholder.com/236x282" className="border-radius-18px box-shadow-extra-large" alt="" data-no-retina="" />
              </div>
            </motion.div>
            <div className="col-xl-5 ps-3 md-ps-15px col-lg-6 col-md-9 position-relative text-center text-lg-start appear anime-child anime-complete" >
              <motion.div initial={{ translateY: 50, scale: 1.1, rotateY: 50, opacity: 0 }}
                animate={{ translateY: 0, scale: 1, rotateY: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }} className="fs-90 xl-fs-80 lh-80 mb-35px text-white ls-minus-3px" style={{}}>
                <span className="text-danger d-block">{import.meta.env.VITE_PRUEBA}</span>
                <span className="d-inline-block">Tu CV</span>
                <span className="fw-800 d-inline-block">en minutos</span>
              </motion.div>
              <motion.span initial={{ translateY: 50, scale: 1.1, rotateY: 50, opacity: 0 }}
                animate={{ translateY: 0, scale: 1, rotateY: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }} className="fs-19 w-90 xs-w-100 d-block lh-32 mb-35px mx-auto mx-lg-0" style={{}}>Diseña tu CV perfecto con facilidad y rapidez</motion.span>
              <motion.div initial={{ translateY: 50, scale: 1.1, rotateY: 50, opacity: 0 }}
                animate={{ translateY: 0, scale: 1, rotateY: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }} className="row pe-20px md-ps-25px sm-px-0 md-border-end-0" style={{}}>
                <Link to='/login' class="btn btn-extra-large btn-white btn-box-shadow btn-rounded text-transform-none fw-600 primary-font ls-0px">Empieza ahora<i class="fa-solid fa-arrow-right"></i></Link>
              </motion.div>
            </div>
          </div>
        </div>
        {/* start marquees */}
        <div className="marquees-text fw-800 fs-250 md-fs-200 ls-minus-10px text-light-gray text-nowrap position-absolute bottom-130px opacity-1 text-center">Fácil - Sencillo - Rápido - Profesional</div>
        {/* end marquees */}
      </section>

      <section id="overview" class="background-position-center-top position-relative" >
        <div id="particles-01" data-particle="true" ></div>
        <div class="container">
          <div class="row justify-content-center align-items-center mb-5">
            <motion.div initial={{ translateY: 30, opacity: 0 }}
              ref={parentRef}
              animate={control}
              variants={{
                visible: { translateY: 0, opacity: 1 },
                hidden: { translateY: 30, opacity: 0 }
              }}
              transition={{
                duration: 1.2,
                delay: 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }} class="col-12 text-center last-paragraph-no-margin appear anime-complete">
              <div class="text-center bg-golden-yellow text-white fs-16 lh-36 border-radius-30px d-inline-block ps-20px pe-20px align-middle me-10px">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
              <span class="text-white fs-26 d-inline-block align-middle ls-minus-05px">Tu mejor opción para crear CVs</span>
            </motion.div>
          </div>
          <div class="row align-items-center mb-6 md-mb-10">
            <motion.div class="col-md-6 position-relative sm-mb-30px appear anime-complete" ref={parentRef}
              initial={{ translateX: -50, opacity: 0 }}
              animate={control}
              variants={{
                visible: { translateX: 0, opacity: 1 },
                hidden: { translateX: -50, opacity: 0 }
              }}
              transition={{
                duration: 1.5,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}>
              <div class="outside-box-left-20 lg-outside-box-left-30">
                <img src="https://via.placeholder.com/957x498" alt="" data-no-retina="" />
              </div>
            </motion.div>
            <motion.div class="col-md-6 ps-5 md-ps-15px appear anime-child anime-complete" ref={parentRef}
              initial={{ translateX: 50, opacity: 0 }}
              animate={control}
              variants={{
                visible: { translateX: 0, opacity: 1 },
                hidden: { translateX: 50, opacity: 0 }
              }}
              transition={{
                duration: 1,
                delay: 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}>
              <i class="line-icon-Hipster-Headphones align-middle icon-double-large mb-30px md-mb-20px opacity-6"></i>
              <h1 class="fw-800 ls-minus-3px text-white mb-30px fancy-text-style-4">Simplicidad garantizada
              </h1>
              <p class="w-90 lg-w-100 mb-35px">Crea un CV profesional en minutos con nuestra plataforma intuitiva y de alta calidad</p>
              <a href="#features" class="btn btn-large btn-white btn-hover-animation-switch btn-box-shadow btn-round-edge section-link">
                <span>
                  <span class="btn-text">Empieza ya</span>
                  <span class="btn-icon"><i class="feather icon-feather-arrow-right"></i></span>
                  <span class="btn-icon"><i class="feather icon-feather-arrow-right"></i></span>
                </span>
              </a>
            </motion.div>
          </div>
          <div class="row row-cols-1 row-cols-lg-3 row-cols-md-2 justify-content-center appear anime-child anime-complete">
            <div class="col process-step-style-05 position-relative hover-box md-mb-30px">
              <div class="process-step-item d-flex align-items-center">
                <div class="process-step-icon-wrap position-relative">
                  <div class="process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-90px w-90px bg-white fs-22 box-shadow-medium-bottom fw-600 position-relative">
                    <span class="number position-relative z-index-1 text-dark-gray">01</span>
                    <div class="box-overlay bg-dark-gray rounded-circle"></div>
                  </div>
                </div>
                <div class="process-content ps-25px">
                  <span class="d-block fw-500 text-white fs-22 lh-30 ls-minus-05px w-60 xl-w-90">Regístrate <strong>gratis</strong></span>
                </div>
              </div>
            </div>
            <div class="col process-step-style-05 position-relative hover-box md-mb-30px" >
              <div class="process-step-item d-flex align-items-center">
                <div class="process-step-icon-wrap position-relative">
                  <div class="process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-90px w-90px bg-white fs-22 box-shadow-medium-bottom fw-600 position-relative">
                    <span class="number position-relative z-index-1 text-dark-gray">02</span>
                    <div class="box-overlay bg-dark-gray rounded-circle"></div>
                  </div>
                </div>
                <div class="process-content ps-25px last-paragraph-no-margin">
                  <span class="d-block fw-500 text-white fs-22 lh-30 ls-minus-05px w-60 xl-w-90"><strong>Personaliza</strong> tu CV</span>
                </div>
              </div>
            </div>
            <div class="col process-step-style-05 position-relative hover-box">
              <div class="process-step-item d-flex align-items-center">
                <div class="process-step-icon-wrap position-relative">
                  <div class="process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-90px w-90px bg-white fs-22 box-shadow-medium-bottom fw-600 position-relative">
                    <span class="number position-relative z-index-1 text-dark-gray">03</span>
                    <div class="box-overlay bg-dark-gray rounded-circle"></div>
                  </div>
                </div>
                <div class="process-content ps-25px last-paragraph-no-margin">
                  <span class="d-block fw-500 text-white fs-22 lh-30 ls-minus-05px w-60 xl-w-90"><strong>Descarga</strong> y comparte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage