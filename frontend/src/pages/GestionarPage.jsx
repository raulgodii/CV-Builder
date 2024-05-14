import ViewCV from "../components/ViewCV";
import { useAuth } from "../context/AuthContext";
import ReactDOMServer from "react-dom/server";
import { useCv } from "../context/CvContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GestionarPage() {
  const { convertContext } = useAuth();
  const { data, getCvs, cvs, createCv, getCv, deleteCv } = useCv();
  const navigate = useNavigate();

  useEffect(() => {
    getCvs();
  }, []);

  const handleDownloadPDF = () => {
    const cvHTML = ReactDOMServer.renderToString(<ViewCV data={data} />);
    convertContext({ html: cvHTML });
  };

  return (
    <>
      {/* <h1>Gestionar CV</h1> */}
      {/* <button onClick={handleDownloadPDF}>Descargar PDF</button> */}
      <section className="ipad-top-space-margin md-h-850px bg-very-light-gray">
        <section className="bg-extra-dark-slate-blue">
          <div className="container">
            <div className="row mb-1">
              <div className="col-12 text-center appear anime-child anime-complete">
                <h2 className="alt-font text-white text-uppercase fw-700">Gestionar CVs</h2>
              </div>
            </div>
            <div className="row justify-content-center mt-0 mb-3 position-relative z-index-1 sm-mx-0 appear anime-child anime-complete">
              <div className="col-lg-10">
                <div className="row align-items-center justify-content-center border-radius-100px p-15px">
                  <button className="btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={async() => { await createCv(); navigate('/crear') }}>Crear CV<i className="fa-solid fa-circle-plus"></i></button>
                </div>
              </div>
            </div>
            <div className="row justify-content-center appear anime-child anime-complete">
              {cvs.map((cv, index) => (
                <div className="col-12 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                  <div className="row align-items-center">
                    <div className="col-3 text-center">
                      <span className="fw-600 text-uppercase text-white">
                        {new Date(cv.updatedAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="col-4 d-flex justify-content-center justify-content-md-center">{cv.data.perfil.nombre ? cv.data.perfil.nombre : 'Sin nombre'}</div>
                    <div className="col-5 btn-dual text-end"><button onClick={async()=>{await getCv(cv._id); navigate('/modificar')}} className="btn btn-link-gradient expand btn-extra-large text-white d-table d-lg-inline-block xl-mb-15px md-mx-auto">Modificar<span className="bg-white"></span></button><button onClick={()=>{deleteCv(cv._id)}} className="btn btn-link-gradient expand btn-extra-large text-white d-table d-lg-inline-block xl-mb-15px md-mx-auto">Eliminar<span className="bg-white"></span></button></div>
                  </div>
                </div>
              ))}
              {(cvs.length == 0) ? (
                <div className="col-lg-10 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                  <div className="row align-items-center">
                    <div className="col-md-12 col-xl-12 text-center"><span>Actualmente aún no has creado ningún CV</span></div>
                  </div>
                </div>
              ) : (<></>)}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default GestionarPage;