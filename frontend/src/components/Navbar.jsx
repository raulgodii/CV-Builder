import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCv } from "../context/CvContext"
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

function Navbar() {
    const { isAuthenticated, logoutContext, user } = useAuth();
    const { deleteData } = useCv();
    const navigate = useNavigate();

    return (
        <header>
            <nav className="navbar navbar-expand-lg mini-header header-dark bg-transparent header-reverse header-demo glass-effect" data-header-hover="light">
                <div className="container-lg">
                    <div className="col-auto me-auto ps-lg-0">
                        <Link className="navbar-brand" to="/">
                            <img src="images/logo-black-small.png" className="default-logo" />
                            <img src="images/logo-black-small.png" className="alt-logo" />
                            <img src="images/logo-black-small.png" className="mobile-logo" />
                        </Link>
                    </div>
                    <div className="col-auto menu-order position-static">
                        <button className="navbar-toggler float-start" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav">
                                {
                                    isAuthenticated ? (
                                        <>
                                            {/* <li className="nav-item ">
                                                <Link className="nav-link" to="/crear">Crear</Link>
                                            </li> */}
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/gestionar">Mis CVs</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/">Inicio</Link>
                                            </li>
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                                            </li>
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/register">Registrarse</Link>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    {
                        isAuthenticated ? (
                            <>
                                <div class="col-auto col-lg-2 text-end">
                                    <div class="header-icon">
                                        <div class="header-social-icon icon">
                                            <Link to="/profile"><i className="feather icon-feather-user text-white"></i></Link>
                                            <a data-tooltip-id="logout-tooltip" href="" onClick={async (event) => {
                                                event.preventDefault();
                                                await logoutContext();
                                                await deleteData();
                                                navigate('/');
                                            }}>
                                                <i className="feather icon-feather-log-out text-white"></i>
                                            </a>

                                            <Tooltip id="logout-tooltip" className='tooltip text-start'>
                                                <span className="fw-700 fs-12 text-white">Cerrar sesión</span>
                                            </Tooltip>

                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>

                            </>
                        )
                    }

                </div>
            </nav>
        </header>
    )
}

export default Navbar