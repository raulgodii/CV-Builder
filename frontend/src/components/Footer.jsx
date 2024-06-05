import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer class="p-0 mt-10">
            <div class="container">
                <div class="row align-items-center mb-4 sm-mb-6">
                    <div class="col-md-10 col-sm-8 text-center text-sm-start xs-mb-25px">
                        <h5 class="mb-0 text-white fw-400 ls-minus-1px">Crea el CV <span class="text-decoration-line-bottom-medium fw-600 text-white text-white-hover">perfecto</span></h5>
                    </div>
                    <div class="col-md-2 col-sm-4 text-center text-sm-end">
                        <Link to="/" class="footer-logo d-inline-block"><img src="/images/logo-black-small.png" alt="" /></Link>
                    </div>
                </div>
            </div>
            <div class="footer-bottom pt-25px pb-25px border-top border-color-charcoal-grey">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-7 text-center text-lg-start md-mb-10px">
                            <ul class="footer-navbar fw-600 fs-16">
                                <li class="nav-item active"><Link to="/" class="nav-link">Inicio</Link></li>
                                <li class="nav-item"><Link to="/blog" class="nav-link">Blog</Link></li>
                                <li class="nav-item"><Link to="/login" class="nav-link">Iniciar sesión</Link></li>
                                <li class="nav-item"><Link to="/register" class="nav-link">Registrarse</Link></li>
                            </ul>
                        </div>
                        <div class="col-lg-5 text-center text-lg-end">
                            <span class="fs-15">© 2024 - CV Builder</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer