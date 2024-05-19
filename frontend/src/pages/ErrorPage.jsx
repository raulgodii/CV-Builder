import React from 'react'

function ErrorPage() {
    return (
        <section class="cover-background full-screen ipad-top-space-margin md-h-550px">
            <div class="container h-100">
                <div class="row align-items-center justify-content-center h-100">
                    <div class="col-12 col-xl-6 col-lg-7 col-md-9 text-center appear anime-child anime-complete">
                        <h6 class="text-dark-gray fw-600 mb-5px text-uppercase">Ups!</h6>
                        <h1 class="fs-200 sm-fs-170 text-dark-gray fw-700 ls-minus-8px">404</h1>
                        <h4 class="text-dark-gray fw-600 sm-fs-22 mb-10px ls-minus-1px">Página no encontrada</h4>
                        <p class="mb-30px lh-28 sm-mb-30px w-55 md-w-80 sm-w-95 mx-auto">La página que estás buscando no existe o no está actualmente disponible</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ErrorPage