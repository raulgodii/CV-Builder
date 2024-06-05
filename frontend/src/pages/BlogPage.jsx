import { Link } from "react-router-dom"
import Footer from "../components/Footer"

function BlogPage() {
    return (
        <>
            <section class="pb-0 ipad-top-space-margin md-pt-0">
                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-12 col-xl-7 col-lg-8 text-center position-relative page-title-double-large">
                            <div class="d-flex flex-column justify-content-center extra-very-small-screen">
                                <h1 class="text-white alt-font ls-minus-1px fw-700">Blog</h1>
                                <h2 class="text-white d-inline-block fw-400 ls-0px w-80 xs-w-100 mx-auto">En este espacio, exploraremos los secretos para crear un CV excepcional y destacar en el competitivo mundo laboral</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pt-0 ps-15 pe-15 xl-ps-2 xl-pe-2 lg-ps-2 lg-pe-2 sm-mx-0">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <ul class="blog-classic blog-wrapper row grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large">
                                <li class="grid-item">
                                    <div class="card bg-transparent border-0 h-100">
                                        <div class="blog-image position-relative overflow-hidden border-radius-4px">
                                            <Link to="/blog/errores-comunes"><img src="/images/errores-comunes1.jpg" alt="" /></Link>
                                        </div>
                                        <div class="card-body px-0 pt-30px pb-30px">
                                            <span class="fs-13 text-uppercase mb-5px d-block"><span class="text-white text-white-hover fw-600 categories-text">CV Builder</span><span class="blog-date text-white-hover">26 Abril 2024</span></span>
                                            <Link to="/blog/errores-comunes" class="card-title mb-10px fw-600 fs-17 lh-26 text-white text-white-hover d-inline-block w-95">Errores comunes en un CV y cómo evitarlos</Link>
                                            <p class="mb-10px w-95">Estos son los 7 errores comunes al crear un CV...</p>
                                            <Link to="/blog/errores-comunes" class="card-link alt-font fs-12 text-uppercase text-white text-white-hover fw-700">Leer más<i class="feather icon-feather-arrow-right icon-very-small"></i></Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* <div class="col-12 mt-2 d-flex justify-content-center">
                            <ul class="pagination pagination-style-01 fs-13 fw-500 mb-0">
                                <li class="page-item"><a class="page-link" href="#"><i class="feather icon-feather-arrow-left fs-18 d-xs-none"></i></a></li>
                                <li class="page-item"><a class="page-link" href="#">01</a></li>
                                <li class="page-item active"><a class="page-link" href="#">02</a></li>
                                <li class="page-item"><a class="page-link" href="#">03</a></li>
                                <li class="page-item"><a class="page-link" href="#">04</a></li>
                                <li class="page-item"><a class="page-link" href="#"><i class="feather icon-feather-arrow-right fs-18 d-xs-none"></i></a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>
    )
}

export default BlogPage