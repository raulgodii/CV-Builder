import { useCv } from "../context/CvContext";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { Link } from "react-router-dom";

function GestionarPage() {
  const { getCvs, cvs, createCv, deleteCv } = useCv();
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteCvId, setDeleteCvId] = useState(null);
  const navigate = useNavigate();

  const openModal = (cvId) => {
    setDeleteCvId(cvId);
    setDeleteModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setDeleteModal(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCvs();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate('/404');
      }
    };

    fetchData();
  }, []);

  const childVariants = {
    hidden: { opacity: 0, translateY: 30 },
    visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  return (
    <>
      {loading ? <div class="page-loader"></div> :
        <section className="full-screen d-flex align-items-start ipad-top-space-margin bg-black">
          <div className="container">
            <div className="row mb-1">
              <div className="col-12 text-center appear anime-child anime-complete">
                <h2 className="alt-font text-white text-uppercase fw-700">Gestionar CVs</h2>
              </div>
            </div>
            <div className="row justify-content-center mt-0 mb-3 position-relative z-index-1 sm-mx-0 appear anime-child anime-complete">
              <div className="col-lg-10">
                <div className="row align-items-center justify-content-center border-radius-100px p-15px">
                  <button className="btn btn-small btn-white btn-box-shadow fw-600 d-table d-lg-inline-block lg-mb-15px md-mx-auto" onClick={async () => { const id = await createCv(); navigate('/crear/' + id) }}>Crear CV<i className="fa-solid fa-circle-plus"></i></button>
                </div>
              </div>
            </div>
            <motion.div className="row justify-content-center" initial="hidden" animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.25
                  }
                }
              }}>
              {cvs.map((cv, index) => (
                <>
                  <motion.div variants={childVariants} className="col-12 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                    <div className="row align-items-center">
                      <div className="col-md-3 text-center">
                        <span className="fw-600 text-uppercase text-white">
                          {new Date(cv.updatedAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center justify-content-md-center">{cv.data.perfil.nombre ? cv.data.perfil.nombre : 'Sin nombre'}</div>
                      <div className="col-md-5 btn-dual text-end d-flex align-items-center flex-wrap">
                        <Link to={"/gestionar/" + cv._id} data-tooltip-id="download-tooltip" className="btn btn-link-gradient expand btn-extra-large text-white d-table d-lg-inline-block xl-mb-15px md-mx-auto"><i className="fa-solid fa-eye icon-extra-medium"></i></Link>
                        <Tooltip id="download-tooltip" className='tooltip text-start'>
                          <span className="fw-700 fs-17 text-white">Ver más</span>
                        </Tooltip>
                        <Link to={"/modificar/" + cv._id} className="btn btn-link-gradient expand btn-extra-large text-white d-table d-lg-inline-block xl-mb-15px md-mx-auto">Modificar<span className="bg-white"></span></Link>
                        <button onClick={() => { openModal(cv._id) }} className="btn btn-link-gradient expand btn-extra-large text-white d-table d-lg-inline-block xl-mb-15px md-mx-auto">Eliminar<span className="bg-white"></span></button>
                      </div>
                    </div>
                  </motion.div>
                </>
              ))}
              {(cvs.length == 0) ? (
                <>
                  <motion.div variants={childVariants} className="col-lg-10 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                    <div className="row align-items-center">
                      <div className="col-md-12 col-xl-12 text-center"><span>Actualmente aún no has creado ningún CV</span></div>
                    </div>
                  </motion.div>
                </>
              ) : (<></>)}
            </motion.div >
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
                        <button className="btn btn-very-small btn-rounded btn-dark-gray popup-modal-dismiss mt-10px mx-2" onClick={() => { deleteCv(deleteCvId); closeModal() }}>Confirmar</button>
                        <button className="btn btn-very-small btn-rounded btn-transparent-light-gray md-mx-auto mt-10px mx-2" onClick={closeModal}>Cancelar</button>
                        <button type="button" className="mfp-close" onClick={closeModal}>×</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </section>
      }
    </>
  );
}

export default GestionarPage;