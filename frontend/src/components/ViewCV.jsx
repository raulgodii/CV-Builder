
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
                            <h2>{perfil.nombre} {perfil.primer_apellido}</h2>
                            <h3>{perfil.profesion}</h3>
                        </div>
                        <div class="section1_perfil_contacto">
                            <ul>
                                <li>
                                    <div class="icon"><i class="fa-solid fa-phone"></i></div>
                                    <div class="data">{perfil.contacto.telefono}</div>
                                </li>
                                <li>
                                    <div class="icon"><i class="fa-solid fa-envelope"></i></div>
                                    <div class="data">{perfil.contacto.email}</div>
                                </li>
                                <li>
                                    <div class="icon"><i class="fa-solid fa-house"></i></div>
                                    <div class="data">{perfil.contacto.direccion}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="section1_habilidades">
                            <h2 class="section1_title">Habilidades</h2>
                            <ul>
                                {habilidades.map((habilidad, index) => (
                                    <li key={index}>
                                        <div class="template1_progressbar_header">
                                            <div class="template1_progressbar_title">{habilidad.titulo}</div>
                                            <div class="template1_progressbar_level">{habilidad.puntuacion}%</div>
                                        </div>
                                        <div class="template1_progressbar"><div class="template1_progressbar_data" style={{ width: `${habilidad.puntuacion}%` }}></div></div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div class="section2">
                        <div class="section2_descripcion">
                            <h2 class="section2_title">Sobre mi</h2>
                            <p>
                                {perfil.descripcion}
                            </p>
                        </div>
                        <div class="section2_container">
                            <h2 class="section2_title">Experiencia Laboral</h2>
                            <ul>
                                {experiencia.map((exp, index) => (
                                    <li key={index}>
                                        <div class="section2_container_titulo">{exp.lugar}</div>
                                        <div class="section2_container_puesto">{exp.titulo}</div>
                                        <div class="section2_container_fecha">{exp.fecha}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div class="section2_container">
                            <h2 class="section2_title">Formación Academica</h2>
                            <ul>
                                {formacion.map((form, index) => (
                                    <li key={index}>
                                        <div class="section2_container_titulo">{form.lformugar}</div>
                                        <div class="section2_container_puesto">{form.titulo}</div>
                                        <div class="section2_container_fecha">{form.fecha}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div class="section2_container idiomas">
                            <h2 class="section2_title">Idiomas</h2>
                            <ul>
                                {idiomas.map((idioma, index) => (
                                    <li key={index}>
                                        <div class="section2_container_titulo">{idioma.titulo}</div>
                                        <div class="section2_container_puesto">{idioma.nivel}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ViewCV;