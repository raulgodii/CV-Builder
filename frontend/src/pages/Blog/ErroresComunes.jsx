import { Link } from "react-router-dom"
import Footer from "../../components/Footer"

function ErroresComunes() {
    return (
        <>
            <section className="p-0 sm-pb-40px top-space-margin page-title-center-alignment">
                <div className="container">
                    <div className="row align-items-center justify-content-center small-screen sm-h-auto">
                        <div className="col-lg-10 text-center">
                            <span className="fs-18 mb-30px d-inline-block sm-mb-20px">Por <span className="text-white text-white-hover text-decoration-line-bottom">CV Builder</span> el 26 Abril 2024</span>
                            <h1 className="alt-font fw-600 text-white ls-minus-2px mb-0">Errores comunes en un CV y cómo evitarlos</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-0 ps-13 pe-13 lg-ps-4 lg-pe-4 sm-px-0">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12"><img src="/images/errores-comunes1.jpg" className="w-100" alt="" /></div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-md-12 last-paragraph-no-margin text-center text-md-start">
                                    <h3 className="alt-font fw-600 text-white">Los 7 errores comunes en un CV que debes evitar</h3>
                                    <p>Entendemos lo crucial que es para ti destacar entre la multitud de candidatos cuando buscas un nuevo empleo. <u>Tu currículum vitae es tu carta de presentación</u>, y si no está correctamente estructurado y redactado, puede pasar desapercibido ante los ojos de los reclutadores.</p>

                                    <p>Es por eso que hoy queremos abordar este tema tan importante y ayudarte a evitar los <b>7 errores comunes</b> que muchas personas cometen al redactar su CV. Sigue leyendo para descubrir cómo puedes mejorar tu CV y <b>aumentar tus posibilidades</b> de conseguir la oportunidad laboral que tanto deseas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="py-0 ps-13 pe-13 lg-ps-4 lg-pe-4 sm-px-0">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12"><img src="https://via.placeholder.com/1410x850" className="w-100" alt="" /></div>
                    </div>
                </div>
            </section> */}
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 text-center text-md-start"><img src="/images/errores-comunes2.jpg" className="h-100 object-fit-cover py-5" alt="" /></div>
                                <div className="offset-lg-1 col-md-8 last-paragraph-no-margin text-center text-md-start">
                                    <div className="text-center text-md-start">
                                        <h5 className="text-white fw-500 w-90 md-w-100 alt-font">1. Información Irrelevante</h5>
                                    </div>
                                    <div className="h-3px w-100 bg-dark-gray"></div>
                                    <p className="mb-35px"><strong>Uno de los errores más comunes es incluir información que no es relevante para el puesto al que se está aplicando.</strong> Añadir detalles personales como el estado civil, la religión o el lugar de nacimiento no es necesario y puede dar una imagen poco profesional. En <u>CV Builder</u>, te guiamos para que sólo incluyas la información relevante, destacando las habilidades y experiencias que realmente importan para el puesto deseado.</p>
                                    <div className="text-center text-md-start">
                                        <h5 className="text-white fw-500 w-90 md-w-100 alt-font">2. Extensión Excesiva</h5>
                                    </div>
                                    <div className="h-3px w-100 bg-dark-gray"></div>
                                    <p className="mb-35px"><strong>Un CV extenso puede ser contraproducente.</strong> Los reclutadores suelen dedicar solo unos segundos a la revisión inicial de cada CV. Por ello, es vital ser conciso y directo. En <u>CV Builder</u>, te proporcionamos estructuras optimizadas que te ayudan a mantener tu CV conciso y directo, entre una y dos páginas.</p>
                                    <div className="text-center text-md-start">
                                        <h5 className="text-white fw-500 w-90 md-w-100 alt-font">3. Errores Ortográficos y Gramaticales</h5>
                                    </div>
                                    <div className="h-3px w-100 bg-dark-gray"></div>
                                    <p className="mb-35px"><strong>La presencia de errores ortográficos y gramaticales puede ser interpretada como una falta de atención al detalle y profesionalismo.</strong> Antes de enviar tu CV, asegúrate de revisarlo minuciosamente. Nuestra plataforma incluye herramientas de corrección ortográfica y gramatical integradas, lo que garantiza que tu CV esté libre de errores y sea profesional.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-md-8 last-paragraph-no-margin text-center text-md-start">
                                    <div className="text-center text-md-start">
                                        <h5 className="text-white fw-500 w-90 md-w-100 alt-font">4. Descripciones Genéricas de Experiencia Laboral</h5>
                                    </div>
                                    <div className="h-3px w-100 bg-dark-gray"></div>
                                    <p className="mb-35px"><strong>Incluir descripciones vagas y genéricas de tus experiencias laborales es un error común.</strong> En <u>CV Builder</u>, te ayudamos a detallar tus responsabilidades y logros de manera específica y cuantificable. Nuestras guías y ejemplos te orientan para que cada posición refleje claramente tu impacto y contribución, lo que hace que tu CV sea más atractivo para los reclutadores.</p>
                                    <div className="text-center text-md-start">
                                        <h5 className="text-white fw-500 w-90 md-w-100 alt-font">5. Diseño Sobrecargado o Poco Profesional</h5>
                                    </div>
                                    <div className="h-3px w-100 bg-dark-gray"></div>
                                    <p className="mb-35px"><strong>Un diseño excesivamente cargado puede distraer del contenido de tu CV.</strong> Opta por un formato limpio y profesional que facilite la lectura. En <u>CV Builder</u>, ofrecemos plantillas elegantes y profesionales que garantizan una presentación óptima de tu información.</p>
                                    <div className="text-center text-md-start">
                                        <h5 className="text-white fw-500 w-90 md-w-100 alt-font">6. Falta de una Sección de Habilidades</h5>
                                    </div>
                                    <div className="h-3px w-100 bg-dark-gray"></div>
                                    <p className="mb-35px"><strong>No destacar tus habilidades puede ser un gran error.</strong> En <u>CV Builder</u>, te proporcionamos plantillas que incluyen una sección dedicada a tus habilidades, permitiéndote resaltar aquellas que son más relevantes para el puesto al que aspiras. Esto asegura que los reclutadores vean de inmediato tus competencias clave.</p>
                                    <div className="text-center text-md-start">
                                        <h5 className="text-white fw-500 w-90 md-w-100 alt-font">7. Información de Contacto Incorrecta</h5>
                                    </div>
                                    <div className="h-3px w-100 bg-dark-gray"></div>
                                    <p className="mb-35px"><strong>Asegúrate de que tu información de contacto esté actualizada y sea correcta.</strong> Un error en tu número de teléfono o correo electrónico podría costarte una entrevista, y nuestra plataforma te guía para evitarlo. Verifica que toda la información sea precisa y esté actualizada.</p>
                                </div>
                                <div className="offset-lg-1 col-lg-3 col-md-4 text-center text-md-start"><img src="/images/errores-comunes3.jpg" className="h-100 py-5 object-fit-cover" alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-0 ps-13 pe-13 lg-ps-4 lg-pe-4 sm-px-0">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12"><img src="/images/errores-comunes4.jpg" className="w-100" alt="" /></div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 text-center text-md-start"><h5 className="alt-font fw-600 text-white">En definitiva, te lo ponemos fácil</h5></div>
                                <div className="offset-lg-1 col-md-8 last-paragraph-no-margin text-center text-md-start">
                                    <p><strong>Evitar estos errores comunes es esencial para maximizar tus oportunidades laborales.</strong> En <u>CV Builder</u>, no solo te ayudamos a crear un CV perfecto de manera fácil y rápida, sino que también te proporcionamos las herramientas necesarias para evitar estos errores, asegurando que tu CV destaque entre la multitud.</p>
                                    <p className="mb-5 text-white"><strong>¡Empieza hoy mismo con CV Builder y da el primer paso hacia tu futuro profesional exitoso!</strong></p>
                                    <Link to='/register' class="btn btn-extra-large btn-white btn-box-shadow btn-rounded text-transform-none fw-600 primary-font ls-0px">Empieza ahora<i class="fa-solid fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="half-section pt-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="row mb-30px">
                                <div className="tag-cloud col-md-9 text-center text-md-start sm-mb-15px">
                                    <a href="demo-web-agency-blog.html">Development</a>
                                    <a href="demo-web-agency-blog.html">Event</a>
                                    <a href="demo-web-agency-blog.html">Multimedia </a>
                                    <a href="demo-web-agency-blog.html">Fashion</a>
                                </div>
                                <div className="tag-cloud col-md-3 text-uppercase text-center text-md-end">
                                    <a className="likes-count fw-500 mx-0" href="#"><i className="fa-regular fa-heart text-red me-10px"></i><span className="text-white text-white-hover">05 Likes</span></a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-6">
                                    <div className="d-block d-md-flex w-100 box-shadow-extra-large align-items-center bg-white border-radius-4px p-7 sm-p-35px">
                                        <div className="w-140px text-center me-50px sm-mx-auto">
                                            <img src="https://via.placeholder.com/125x125" className="rounded-circle w-120px" alt="" />
                                            <a href="demo-web-agency-blog.html" className="text-white text-white-hover fw-500 mt-20px d-inline-block lh-20">Colene Landin</a>
                                            <span className="fs-15 lh-20 d-block sm-mb-15px">Co-founder</span>
                                        </div>
                                        <div className="w-75 sm-w-100 text-center text-md-start last-paragraph-no-margin">
                                            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type.</p>
                                            <a href="demo-web-agency-blog.html" className="btn btn-link btn-large text-white mt-15px">All author posts</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 text-center elements-social social-icon-style-04">
                                    <ul className="large-icon dark">
                                        <li><a className="facebook" href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook-f"></i><span></span></a></li>
                                        <li><a className="twitter" href="http://www.twitter.com" target="_blank"><i className="fa-brands fa-twitter"></i><span></span></a></li>
                                        <li><a className="instagram" href="http://www.instagram.com" target="_blank"><i className="fa-brands fa-instagram"></i><span></span></a></li>
                                        <li><a className="linkedin" href="http://www.linkedin.com" target="_blank"><i className="fa-brands fa-linkedin-in"></i><span></span></a></li>
                                        <li><a className="behance" href="http://www.behance.com/" target="_blank"><i className="fa-brands fa-behance"></i><span></span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section class="bg-very-light-gray">
                <div class="container">
                    <div class="row justify-content-center mb-1">
                        <div class="col-lg-7 text-center">
                            <span class="alt-font fw-500 text-uppercase d-inline-block">Podría interesarte</span>
                            <h5 class="alt-font text-dark-gray fw-500">Posts relacionados</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <ul class="blog-classic blog-wrapper grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large appear anime-child anime-complete row" style={{ position: "relative" }}>
                                <li class="grid-item">
                                    <div class="card bg-transparent border-0 h-100">
                                        <div class="blog-image position-relative overflow-hidden border-radius-4px h-180px object-fit-cover">
                                            <Link to="/blog/razones-para-usar-nuestra-plataforma"><img src="/images/razones-plataforma1.png" alt="" /></Link>
                                        </div>
                                        <div class="card-body px-0 pt-30px pb-30px">
                                            <span class="fs-13 text-uppercase mb-5px d-block"><span class="text-dark-gray text-dark-gray-hover fw-600 categories-text">CV Builder</span><span class="blog-date text-dark-gray-hover">29 Abril 2024</span></span>
                                            <Link to="/blog/razones-para-usar-nuestra-plataforma" class="card-title mb-10px fw-600 fs-17 lh-26 text-dark-gray text-dark-gray-hover d-inline-block w-95">Razones para usar nuestra plataforma</Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-4 sm-pt-40px sm-pb-40px overflow-hidden position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 text-center text-sm-start">
                            <div className="outside-box-left-25 xl-outside-box-left-10 sm-outside-box-left-0">
                                <div className="fs-350 xl-fs-250 lg-fs-200 md-fs-170 sm-fs-100 text-white fw-600 ls-minus-20px word-break-normal">work</div>
                            </div>
                        </div>
                        <div className="col-sm-7 text-center text-sm-end">
                            <div className="outside-box-right-5 sm-outside-box-right-0">
                                <div className="fs-350 xl-fs-250 lg-fs-200 md-fs-170 sm-fs-100 text-base-color fw-600 ls-minus-20px position-relative d-inline-block word-break-normal">together
                                    {/* <div className="position-absolute left-minus-140px top-minus-140px z-index-9 xl-left-minus-110px top-minus-140px xl-top-minus-100px md-top-minus-90px z-index-9 xl-w-230px md-w-200px d-none d-md-block">
                                        <img src="/images/demo-web-agency-05.png" className="animation-rotation" alt="" />
                                        <div className="absolute-middle-center w-100 z-index-minus-1"><img src="/images/demo-web-agency-04.png" alt="" /></div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>
    )
}

export default ErroresComunes