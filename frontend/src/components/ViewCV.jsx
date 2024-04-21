
function ViewCV({ data }) {

    const styles = {
        cvContainer: {
            fontFamily: 'Arial, sans-serif',
            margin: '0 auto',
            maxWidth: '800px',
            padding: '20px'
        },
        section: {
            marginBottom: '30px'
        },
        heading: {
            color: '#333',
            fontSize: '24px',
            marginBottom: '10px'
        },
        profileInfo: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px'
        },
        contactInfo: {
            flex: '1',
            marginLeft: '20px'
        },
        list: {
            listStyle: 'none',
            padding: '0'
        },
        listItem: {
            marginBottom: '10px'
        },
        label: {
            color: '#007bff', // Color azul
            fontWeight: 'bold'
        },
        paragraph: {
            color: '#666',
            fontSize: '16px',
            marginBottom: '5px'
        }
    };

    return (
        <div style={styles.cvContainer}>
            {/* Perfil */}
            <section style={styles.section}>
                <h2 style={styles.heading}>Perfil</h2>
                <div style={styles.profileInfo}>
                    <div>
                        <h3>{data.perfil.nombre}</h3>
                        <p>{data.perfil.subtitulo}</p>
                        <p>{data.perfil.descripcion}</p>
                        <p>Fecha de Nacimiento: {data.perfil.fecha_nacimiento}</p>
                    </div>
                    <div style={styles.contactInfo}>
                        <h3>Contacto</h3>
                        <p>Teléfono: {data.perfil.contacto.telefono}</p>
                        <p>Email: {data.perfil.contacto.email}</p>
                        <p>Dirección: {data.perfil.contacto.direccion}</p>
                    </div>
                </div>
            </section>

            {/* Habilidades */}
            <section style={styles.section}>
                <h2 style={styles.heading}>Habilidades</h2>
                <ul style={styles.list}>
                    {data.habilidades.map((habilidad, index) => (
                        <li key={index} style={styles.listItem}>
                            <span style={styles.label}>{habilidad.titulo}:</span> {habilidad.puntuacion}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Formación */}
            <section style={styles.section}>
                <h2 style={styles.heading}>Formación</h2>
                <ul style={styles.list}>
                    {data.formacion.map((curso, index) => (
                        <li key={index} style={styles.listItem}>
                            <span style={styles.label}>{curso.titulo}</span> - {curso.fecha} | {curso.lugar}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Experiencia */}
            <section style={styles.section}>
                <h2 style={styles.heading}>Experiencia</h2>
                <ul style={styles.list}>
                    {data.experiencia.map((trabajo, index) => (
                        <li key={index} style={styles.listItem}>
                            <span style={styles.label}>{trabajo.titulo}</span> - {trabajo.fecha} | {trabajo.lugar}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Idiomas */}
            <section style={styles.section}>
                <h2 style={styles.heading}>Idiomas</h2>
                <ul style={styles.list}>
                    {data.idiomas.map((idioma, index) => (
                        <li key={index} style={styles.listItem}>
                            <span style={styles.label}>{idioma.titulo}:</span> {idioma.nivel}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ViewCV;