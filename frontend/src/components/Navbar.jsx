import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCv } from "../context/CvContext"
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { isAuthenticated, logoutContext, user } = useAuth();
    const { deleteData } = useCv();
    const navigate = useNavigate();
    
    return (
        <header>
            <nav className="navbar navbar-expand-lg mini-header header-light bg-transparent header-reverse header-demo glass-effect" data-header-hover="light">
                <div className="container-lg">
                    <div className="col-auto me-auto ps-lg-0">
                        <Link className="navbar-brand" to="/">
                            <img src="images/logo-black-small.png" data-at2x="images/logo-black-small@2x.png" alt="" className="default-logo" />
                            <img src="images/logo-black-small.png" data-at2x="images/logo-black-small@2x.png" alt="" className="alt-logo" />
                            <img src="images/logo-black-small.png" data-at2x="images/logo-black-small@2x.png" alt="" className="mobile-logo" />
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
                                                <Link className="nav-link" to="/gestionar">Gestionar</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/">Home</Link>
                                            </li>
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/login">Login</Link>
                                            </li>
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/register">Register</Link>
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
                                <div className="col-auto pe-lg-0">
                                    <div className="header-icon">
                                        <div className="header-user-icon icon">
                                            <Link to="/profile"><i className="feather icon-feather-user"></i></Link>
                                        </div>
                                        <div className="header-logout-icon icon">
                                            <a onClick={async () => { await logoutContext(), await deleteData(), navigate('/') }}><i className="feather icon-feather-log-out"></i></a>
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