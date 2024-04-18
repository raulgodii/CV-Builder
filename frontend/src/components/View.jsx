import React from 'react';

function View({ data }) {
  return (
    <div className="cv-preview" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
      <h2>CV Preview</h2>
      <div className="perfil section">
        <h3>Perfil</h3>
        <p><strong>Nombre:</strong> {data?.perfil?.nombre}</p>
        <p><strong>Email:</strong> {data?.perfil?.email}</p>
      </div>
      <div className="habilidades section">
        <h3>Habilidades</h3>
        <p><strong>Habilidad 1:</strong> {data?.habilidades?.habilidad1}</p>
        <p><strong>Habilidad 2:</strong> {data?.habilidades?.habilidad2}</p>
      </div>
      <div className="formacion section">
        <h3>Formación</h3>
        <p><strong>Título:</strong> {data?.formacion?.titulo}</p>
        <p><strong>Institución:</strong> {data?.formacion?.institucion}</p>
      </div>
      <div className="experiencia section">
        <h3>Experiencia</h3>
        <p><strong>Empresa:</strong> {data?.experiencia?.empresa}</p>
        <p><strong>Puesto:</strong> {data?.experiencia?.puesto}</p>
      </div>
      <div className="idiomas section">
        <h3>Idiomas</h3>
        <p><strong>Idioma 1:</strong> {data?.idiomas?.idioma1}</p>
        <p><strong>Nivel:</strong> {data?.idiomas?.nivel1}</p>
      </div>
    </div>
  );
}

export default View;
