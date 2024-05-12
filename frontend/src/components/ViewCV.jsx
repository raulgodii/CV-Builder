import Habilidades from './multistep/habilidades/Habilidades';
import Experiencia from './multistep/experiencia/Experiencia';

function ViewCV({ data }) {

    const { perfil, habilidades, formacion, experiencia, idiomas } = data;

    return (
        // <>
        //     <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

        //     <div className="resume">
        //         <div className="resume_left">
        //             <div className="resume_profile">
        //                 <img src="https://i.imgur.com/eCijVBe.png" alt="profile_pic" />
        //             </div>
        //             <div className="resume_content">
        //                 <div className="resume_item resume_info">
        //                     <div className="title">
        //                         <p className="bold">{perfil.nombre} {perfil.primer_apellido}</p>
        //                         <p className="regular">{perfil.profesion}</p>
        //                     </div>
        //                     <ul>
        //                         <li>
        //                             <div className="icon">
        //                                 <i className="fas fa-map-signs"></i>
        //                             </div>
        //                             <div className="data">
        //                                 {perfil.contacto.direccion}
        //                             </div>
        //                         </li>
        //                         <li>
        //                             <div className="icon">
        //                                 <i className="fas fa-mobile-alt"></i>
        //                             </div>
        //                             <div className="data">
        //                                 {perfil.contacto.telefono}
        //                             </div>
        //                         </li>
        //                         <li>
        //                             <div className="icon">
        //                                 <i className="fas fa-envelope"></i>
        //                             </div>
        //                             <div className="data">
        //                                 {perfil.contacto.email}
        //                             </div>
        //                         </li>
        //                     </ul>
        //                 </div>
        //                 <div className="resume_item resume_skills">
        //                     <div className="title">
        //                         <p className="bold">Habilidades</p>
        //                     </div>
        //                     <ul>
        //                         {habilidades.map((habilidad, index) => (
        //                             <li>
        //                                 <div className="skill_name">
        //                                     {habilidad.titulo}
        //                                 </div>
        //                                 <div className="skill_progress">
        //                                     <span style={{ width: `${habilidad.puntuacion}%` }}></span>
        //                                 </div>
        //                                 <div className="skill_per">{habilidad.puntuacion}%</div>
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 </div>
        //                 {/* <div className="resume_item resume_social">
        //                     <div className="title">
        //                         <p className="bold">Social</p>
        //                     </div>
        //                     <ul>
        //                         <li>
        //                             <div className="icon">
        //                                 <i className="fab fa-facebook-square"></i>
        //                             </div>
        //                             <div className="data">
        //                                 <p className="semi-bold">Facebook</p>
        //                                 <p>Stephen@facebook</p>
        //                             </div>
        //                         </li>
        //                         <li>
        //                             <div className="icon">
        //                                 <i className="fab fa-twitter-square"></i>
        //                             </div>
        //                             <div className="data">
        //                                 <p className="semi-bold">Twitter</p>
        //                                 <p>Stephen@twitter</p>
        //                             </div>
        //                         </li>
        //                         <li>
        //                             <div className="icon">
        //                                 <i className="fab fa-youtube"></i>
        //                             </div>
        //                             <div className="data">
        //                                 <p className="semi-bold">Youtube</p>
        //                                 <p>Stephen@youtube</p>
        //                             </div>
        //                         </li>
        //                         <li>
        //                             <div className="icon">
        //                                 <i className="fab fa-linkedin"></i>
        //                             </div>
        //                             <div className="data">
        //                                 <p className="semi-bold">Linkedin</p>
        //                                 <p>Stephen@linkedin</p>
        //                             </div>
        //                         </li>
        //                     </ul>
        //                 </div> */}
        //             </div>
        //         </div>
        //         <div className="resume_right">
        //             <div className="resume_item resume_about">
        //                 <div className="title">
        //                     <p className="bold">Sobre mi</p>
        //                 </div>
        //                 <p>{perfil.descripcion}</p>
        //             </div>
        //             <div className="resume_item resume_work">
        //                 <div className="title">
        //                     <p className="bold">Experiencia Laboral</p>
        //                 </div>
        //                 <ul>
        //                     {experiencia.map((exp, index) => (
        //                         <li>
        //                             <div className="date">{exp.fecha}</div>
        //                             <div className="info">
        //                                 <p className="semi-bold">{exp.titulo}</p>
        //                                 <p>{exp.lugar}</p>
        //                             </div>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //             <div className="resume_item resume_education">
        //                 <div className="title">
        //                     <p className="bold">Formación Academica</p>
        //                 </div>
        //                 <ul>
        //                     {formacion.map((form, index) => (
        //                         <li>
        //                             <div className="date">{form.fecha}</div>
        //                             <div className="info">
        //                                 <p className="semi-bold">{form.titulo}</p>
        //                                 <p>{form.lugar}</p>
        //                             </div>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //             <div className="resume_item resume_education">
        //                 <div className="title">
        //                     <p className="bold">Idiomas</p>
        //                 </div>
        //                 <ul>
        //                     {idiomas.map((idioma, index) => (
        //                         <li>
        //                             <div className="date">{idioma.titulo}</div>
        //                             <div className="info">
        //                                 <p className="semi-bold">{idioma.nivel}</p>
        //                             </div>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <>
            <div class="wrapper">
                <section class="template1">
                    <div class="section1">
                        <div class="section1_foto">

                        </div>
                        <div class="section1_perfil_nombre">
                            <h2>Nombre Apellido</h2>
                            <h3>Profesion</h3>
                        </div>
                        <div class="section1_perfil_contacto">
                            <ul>
                                <li>
                                    <div class="icon"><i class="fa-solid fa-phone"></i></div>
                                    <div class="data">+34 695594524</div>
                                </li>
                                <li>
                                    <div class="icon"><i class="fa-solid fa-envelope"></i></div>
                                    <div class="data">email@gmail.com</div>
                                </li>
                                <li>
                                    <div class="icon"><i class="fa-solid fa-house"></i></div>
                                    <div class="data">C/Cruces, Nº40A</div>
                                </li>
                            </ul>
                        </div>
                        <div class="section1_habilidades">
                            <h2 class="section1_title">Habilidades</h2>
                            <ul>
                                <li>
                                    <div class="template1_progressbar_header">
                                        <div class="template1_progressbar_title">Habilidad</div>
                                        <div class="template1_progressbar_level">20%</div>
                                    </div>
                                    <div class="template1_progressbar"><div class="template1_progressbar_data" style={{ width: "20%" }}></div></div>
                                </li>
                                <li>
                                    <div class="template1_progressbar_header">
                                        <div class="template1_progressbar_title">Habilidad</div>
                                        <div class="template1_progressbar_level">50%</div>
                                    </div>
                                    <div class="template1_progressbar"><div class="template1_progressbar_data" style={{ width: "20%" }}></div></div>
                                </li>
                                <li>
                                    <div class="template1_progressbar_header">
                                        <div class="template1_progressbar_title">Habilidad</div>
                                        <div class="template1_progressbar_level">10%</div>
                                    </div>
                                    <div class="template1_progressbar"><div class="template1_progressbar_data" style={{ width: "20%" }}></div></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="section2">
                        <div class="section2_descripcion">
                            <h2 class="section2_title">Sobre mi</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eligendi nulla ad perspiciatis quaerat vel, reiciendis asperiores labore nobis commodi voluptatum, iure, consequuntur praesentium. Perferendis fugiat unde eligendi ea iusto.
                            </p>
                        </div>
                        <div class="section2_container">
                            <h2 class="section2_title">Experiencia Laboral</h2>
                            <ul>
                                <li>
                                    <div class="section2_container_titulo">Hotel Elba Lucia</div>
                                    <div class="section2_container_puesto">Camarero de buffet</div>
                                    <div class="section2_container_fecha">21/02/2020 - 20/06/2021</div>
                                </li>
                                <li>
                                    <div class="section2_container_titulo">Hotel Elba Lucia</div>
                                    <div class="section2_container_puesto">Camarero de buffet</div>
                                    <div class="section2_container_fecha">21/02/2020 - 20/06/2021</div>
                                </li>
                                <li>
                                    <div class="section2_container_titulo">Hotel Elba Lucia</div>
                                    <div class="section2_container_puesto">Camarero de buffet</div>
                                    <div class="section2_container_fecha">21/02/2020 - 20/06/2021</div>
                                </li>
                            </ul>
                        </div>
                        <div class="section2_container">
                            <h2 class="section2_title">Formación Academica</h2>
                            <ul>
                                <li>
                                    <div class="section2_container_titulo">Universida de Granada</div>
                                    <div class="section2_container_puesto">Ingenieria Informatica</div>
                                    <div class="section2_container_fecha">21/02/2020 - 20/06/2021</div>
                                </li>
                                <li>
                                    <div class="section2_container_titulo">Universida de Granada</div>
                                    <div class="section2_container_puesto">Ingenieria Informatica</div>
                                    <div class="section2_container_fecha">21/02/2020 - 20/06/2021</div>
                                </li>
                                <li>
                                    <div class="section2_container_titulo">Universida de Granada</div>
                                    <div class="section2_container_puesto">Ingenieria Informatica</div>
                                    <div class="section2_container_fecha">21/02/2020 - 20/06/2021</div>
                                </li>
                            </ul>
                        </div>
                        <div class="section2_container idiomas">
                            <h2 class="section2_title">Idiomas</h2>
                            <ul>
                                <li>
                                    <div class="section2_container_titulo">Español</div>
                                    <div class="section2_container_puesto">Nativo</div>
                                </li>
                                <li>
                                    <div class="section2_container_titulo">Español</div>
                                    <div class="section2_container_puesto">Nativo</div>
                                </li>
                                <li>
                                    <div class="section2_container_titulo">Español</div>
                                    <div class="section2_container_puesto">Nativo</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ViewCV;