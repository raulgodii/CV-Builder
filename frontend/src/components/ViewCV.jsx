import { useMultiStep } from "../context/MultiStepContext";
import React, { useRef } from 'react';
import '../assets/view.css'

const ViewCV = React.forwardRef((props, ref) => {
    const { data, updateData } = useMultiStep();
    const viewRef = useRef(null);

    return (
        <div ref={ref} className="cv-container">
            {/* Perfil */}
            <section className="profile-section">
                <h2>Perfil</h2>
                <div className="profile-info">
                    <div>
                        <h3>{data.perfil.nombre}</h3>
                        <p>{data.perfil.subtitulo}</p>
                        <p>{data.perfil.descripcion}</p>
                        <p>Fecha de Nacimiento: {data.perfil.fecha_nacimiento}</p>
                    </div>
                    <div className="contact-info">
                        <h3>Contacto</h3>
                        <p>Teléfono: {data.perfil.contacto.telefono}</p>
                        <p>Email: {data.perfil.contacto.email}</p>
                        <p>Dirección: {data.perfil.contacto.direccion}</p>
                    </div>
                </div>
            </section>

            {/* Habilidades */}
            <section className="skills-section">
                <h2>Habilidades</h2>
                <ul>
                    {data.habilidades.map((habilidad, index) => (
                        <li key={index}>
                            <strong>{habilidad.titulo}:</strong> {habilidad.puntuacion}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Formación */}
            <section className="education-section">
                <h2>Formación</h2>
                <ul>
                    {data.formacion.map((curso, index) => (
                        <li key={index}>
                            <strong>{curso.titulo}</strong> - {curso.fecha} | {curso.lugar}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Experiencia */}
            <section className="experience-section">
                <h2>Experiencia</h2>
                <ul>
                    {data.experiencia.map((trabajo, index) => (
                        <li key={index}>
                            <strong>{trabajo.titulo}</strong> - {trabajo.fecha} | {trabajo.lugar}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Idiomas */}
            <section className="languages-section">
                <h2>Idiomas</h2>
                <ul>
                    {data.idiomas.map((idioma, index) => (
                        <li key={index}>
                            <strong>{idioma.titulo}:</strong> {idioma.nivel}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
});

export default ViewCV