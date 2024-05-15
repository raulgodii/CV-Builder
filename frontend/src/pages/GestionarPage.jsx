import ViewCV from "../components/ViewCV";
import { useAuth } from "../context/AuthContext";
import ReactDOMServer from "react-dom/server";
import { useCv } from "../context/CvContext";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from 'react-tooltip'

function GestionarPage() {
  const { data, getCvs, cvs, createCv, getCv, deleteCv, convertContext } = useCv();
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setDeleteModal(true);
  };

  const closeModal = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    getCvs();
  }, []);

  const handleDownloadPDF = async () => {
    const cvHTML = ReactDOMServer.renderToString(<ViewCV data={data} />);
    convertContext({ html: cvHTML });
  };

  return (
    <>
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
                  <button className="btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={async () => { await createCv(); navigate('/crear') }}>Crear CV<i className="fa-solid fa-circle-plus"></i></button>
                </div>
              </div>
            </div>
            <div className="row justify-content-center appear anime-child anime-complete">
              {cvs.map((cv, index) => (
                <>
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
                      <div className="col-5 btn-dual text-end">
                        <button data-tooltip-id="download-tooltip" onClick={async () => { await getCv(cv._id); handleDownloadPDF() }} className="btn btn-link-gradient expand btn-extra-large text-white d-table d-lg-inline-block xl-mb-15px md-mx-auto"><i className="fa-solid fa-download icon-extra-medium"></i></button>
                        <Tooltip id="download-tooltip" className='tooltip text-start'>
                          <span className="fw-700 fs-17 text-white">Descargar (PDF)</span>
                        </Tooltip>
                        <button onClick={async () => { await getCv(cv._id); navigate('/modificar') }} className="btn btn-link-gradient expand btn-extra-large text-white d-table d-lg-inline-block xl-mb-15px md-mx-auto">Modificar<span className="bg-white"></span></button>
                        <button onClick={openModal} className="btn btn-link-gradient expand btn-extra-large text-white d-table d-lg-inline-block xl-mb-15px md-mx-auto">Eliminar<span className="bg-white"></span></button>
                      </div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {deleteModal && (
                      <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 0.3, delay: 0.1 }} exit={{ opacity: 0 }} className="mfp-bg mfp-ready" onClick={closeModal}></motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.1 }} exit={{ opacity: 0, scale: 0.8 }} className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{ height: '1253px' }}>
                          <div className="mfp-container mfp-inline-holder">
                            <div className="mfp-content">
                              <div className="zoom-anim-dialog col-xl-4 col-lg-6 col-md-7 col-11 mx-auto bg-white text-center modal-popup-main p-50px">
                                <span className="text-dark-gray fw-600 fs-24 mb-10px d-block">Vas a eliminar tu CV</span>
                                <p>¿Estás seguro de que deseas eliminar permanentemente tu currículum vitae? Esta acción no se puede revertir y todos los datos asociados se perderán de forma permanente.</p>
                                <button className="btn btn-very-small btn-rounded btn-dark-gray popup-modal-dismiss mt-10px mx-2" onClick={() => { deleteCv(cv._id); closeModal() }}>Confirmar</button>
                                <button className="btn btn-very-small btn-rounded btn-transparent-light-gray md-mx-auto mt-10px mx-2" onClick={closeModal}>Cancelar</button>
                                <button type="button" className="mfp-close" onClick={closeModal}>×</button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </>
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