
function ViewCV({ data, base64Image }) {

    const { perfil, habilidades, formacion, experiencia, idiomas } = data;

    const compareDates = (a, b) => {
        if (a.actualidad && !b.actualidad) {
            return -1;
        }
        if (!a.actualidad && b.actualidad) {
            return 1;
        }
        const dateA = new Date(a.fecha_fin);
        const dateB = new Date(b.fecha_fin);
        return dateB - dateA;
    };

    experiencia?.sort(compareDates);

    formacion?.sort(compareDates);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const habilidadesAsocPerc = {
        1: 25,
        2: 50,
        3: 75,
        4: 100
    };

    const habilidadesAsocTit = {
        1: 'Bueno',
        2: 'Medio',
        3: 'Alto',
        4: 'Avanzado'
    };

    return (
        <>

            <section className="template1">
                <div className="section1">
                    {perfil.foto ?
                        <div className="section1_foto" style={{ backgroundImage: `url(${base64Image})` }}>

                        </div> :
                        <></>
                    }

                    <div className="section1_perfil_nombre">
                        <h2>{perfil.nombre} {perfil.primer_apellido}</h2>
                        <h3>{perfil.profesion}</h3>
                    </div>
                    <div className="section1_perfil_contacto">
                        <ul>
                            <li>
                                <div className="icon"><i className="fa-solid fa-calendar-days"></i></div>
                                <div className="data">{perfil.fecha_nacimiento}</div>
                            </li>
                            <li>
                                <div className="icon"><i className="fa-solid fa-phone"></i></div>
                                <div className="data">{perfil.contacto.telefono}</div>
                            </li>
                            <li>
                                <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                                <div className="data">{perfil.contacto.email}</div>
                            </li>
                            <li>
                                <div className="icon"><i className="fa-solid fa-house"></i></div>
                                <div className="data">{perfil.contacto.direccion}</div>
                            </li>
                        </ul>
                    </div>
                    {
                        habilidades?.length > 0 ?
                            <div className="section1_habilidades">
                                <h2 className="section1_title">Habilidades</h2>
                                <ul>
                                    {habilidades.map((habilidad, index) => (
                                        <li key={index}>
                                            <div className="template1_progressbar_header">
                                                <div className="template1_progressbar_title">{habilidad.titulo}</div>
                                                <div className="template1_progressbar_level">{habilidadesAsocTit[habilidad.puntuacion]}</div>
                                            </div>
                                            <div className="template1_progressbar"><div className="template1_progressbar_data" style={{ width: `${habilidadesAsocPerc[habilidad.puntuacion]}%` }}></div></div>
                                        </li>
                                    ))}
                                </ul>
                            </div> :
                            <></>
                    }
                </div>
                <div className="section2">
                    <div className="section2_descripcion">
                        <h2 className="section2_title">Sobre mi</h2>
                        <p>
                            {perfil.descripcion}
                        </p>
                    </div>
                    {
                        experiencia?.length > 0 ?
                            <div className="section2_container experiencias">
                                <h2 className="section2_title">Experiencia Laboral</h2>
                                <ul>
                                    {experiencia.map((exp, index) => (
                                        <li key={index}>
                                            <div className="section2_container_titulo">{exp.lugar}</div>
                                            <div className="section2_container_puesto">{exp.titulo}</div>
                                            <div className="section2_container_fecha">{(exp.fecha_inicio ? formatDate(exp.fecha_inicio) : 'No disponible') + ' - ' + (exp.actualidad ? 'Actualidad' : formatDate(exp.fecha_fin))}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div> : <></>
                    }

                    {
                        formacion?.length > 0 ?
                            <div className="section2_container formaciones">
                                <h2 className="section2_title">Formación Academica</h2>
                                <ul>
                                    {formacion.map((form, index) => (
                                        <li key={index}>
                                            <div className="section2_container_titulo">{form.lugar}</div>
                                            <div className="section2_container_puesto">{form.titulo}</div>
                                            <div className="section2_container_fecha">{(form.fecha_inicio ? formatDate(form.fecha_inicio) : 'No disponible') + ' - ' + (form.actualidad ? 'Actualidad' : formatDate(form.fecha_fin))}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div> : <></>
                    }

                    {
                        idiomas?.length > 0 ?
                            <div className="section2_container idiomas">
                                <h2 className="section2_title">Idiomas</h2>
                                <ul>
                                    {idiomas.map((idioma, index) => (
                                        <li key={index}>
                                            <div className="section2_container_titulo">{idioma.titulo}</div>
                                            <div className="section2_container_puesto">{idioma.nivel}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div> : <></>
                    }
                </div>
            </section>

            {/* <iframe src="../../public/template1.html" frameborder="0">
                
            </iframe> */}
        </>
    );
};

export default ViewCV;