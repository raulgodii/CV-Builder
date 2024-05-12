import ViewCV from "../components/ViewCV";
import { useAuth } from "../context/AuthContext";
import ReactDOMServer from "react-dom/server";
import { useCv } from "../context/CvContext";

function GestionarPage() {
  const { convertContext } = useAuth();
  const { data } = useCv();

  const handleDownloadPDF = () => {
    const cvHTML = ReactDOMServer.renderToString(<ViewCV data={data} />);
    convertContext({ html: cvHTML });
  };

  return (
    <>
      {/* <h1>Gestionar CV</h1> */}
      {/* <button onClick={handleDownloadPDF}>Descargar PDF</button> */}
      <section className="ipad-top-space-margin md-h-850px bg-very-light-gray">
        <section class="bg-extra-dark-slate-blue">
          <div class="container">
            <div class="row mb-1">
              <div class="col-12 text-center appear anime-child anime-complete" data-anime="{ &quot;el&quot;: &quot;childs&quot;, &quot;translateY&quot;: [30, 0], &quot;opacity&quot;: [0,1], &quot;duration&quot;: 600, &quot;delay&quot;: 0, &quot;staggervalue&quot;: 300, &quot;easing&quot;: &quot;easeOutQuad&quot; }">
                <h2 class="alt-font text-white text-uppercase fw-700">Popular tracklist</h2>
              </div>
            </div>
            <div class="row justify-content-center appear anime-child anime-complete" data-anime="{ &quot;el&quot;: &quot;childs&quot;, &quot;translateY&quot;: [30, 0], &quot;opacity&quot;: [0,1], &quot;duration&quot;: 600, &quot;delay&quot;: 0, &quot;staggervalue&quot;: 300, &quot;easing&quot;: &quot;easeOutQuad&quot; }">
              <div class="col-lg-10 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                <div class="row align-items-center">
                  <div class="col-md-2 text-center"><span class="fw-600 text-uppercase text-white">22 Aug</span></div>
                  <div class="col-md-5 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start"><a href="https://www.youtube.com/" target="blank" class="text-medium-gray text-white-hover"><i class="bi bi-youtube text-white fs-20 me-10px align-middle"></i> Give me one moment in time </a></div>
                  <div class="col-md-2 col-xl-1 text-center"><span>04:35</span></div>
                  <div class="col-md-3 col-lg-2 d-flex justify-content-center align-items-center"><i class="bi bi-suit-heart-fill text-red icon-very-small lh-0px me-10px"></i><div class="fs-14 text-uppercase"><span class="fw-600 text-white">10K+</span> Likes</div></div>
                </div>
              </div>
              <div class="col-lg-10 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                <div class="row align-items-center">
                  <div class="col-md-2 text-center"><span class="fw-600 text-uppercase text-white">22 Jul</span></div>
                  <div class="col-md-5 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start"><a href="https://www.youtube.com/" target="blank" class="text-medium-gray text-white-hover"><i class="bi bi-youtube text-white fs-20 me-10px align-middle"></i> Everything i do i do it for you</a></div>
                  <div class="col-md-2 col-xl-1 text-center"><span>03:25</span></div>
                  <div class="col-md-3 col-lg-2 d-flex justify-content-center align-items-center"><i class="bi bi-suit-heart-fill text-red icon-very-small lh-0px me-10px"></i><div class="fs-14 text-uppercase"><span class="fw-600 text-white">08K+</span> Likes</div></div>
                </div>
              </div>
              <div class="col-lg-10 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                <div class="row align-items-center">
                  <div class="col-md-2 text-center"><span class="fw-600 text-uppercase text-white">08 Jul</span></div>
                  <div class="col-md-5 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start"><a href="https://www.youtube.com/" target="blank" class="text-medium-gray text-white-hover"><i class="bi bi-youtube text-white fs-20 me-10px align-middle"></i> I will be right here waiting for you</a></div>
                  <div class="col-md-2 col-xl-1 text-center"><span>05:15</span></div>
                  <div class="col-md-3 col-lg-2 d-flex justify-content-center align-items-center"><i class="bi bi-suit-heart-fill text-red icon-very-small lh-0px me-10px"></i><div class="fs-14 text-uppercase"><span class="fw-600 text-white">16K+</span> Likes</div></div>
                </div>
              </div>
              <div class="col-lg-10 pt-20px pb-20px border-bottom border-color-transparent-white-light">
                <div class="row align-items-center">
                  <div class="col-md-2 text-center"><span class="fw-600 text-uppercase text-white">22 Jun</span></div>
                  <div class="col-md-5 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start"><a href="https://www.youtube.com/" target="blank" class="text-medium-gray text-white-hover"><i class="bi bi-youtube text-white fs-20 me-10px align-middle"></i>Close your eyes give me your hand</a></div>
                  <div class="col-md-2 col-xl-1 text-center"><span>04:18</span></div>
                  <div class="col-md-3 col-lg-2 d-flex justify-content-center align-items-center"><i class="bi bi-suit-heart-fill text-red icon-very-small lh-0px me-10px"></i><div class="fs-14 text-uppercase"><span class="fw-600 text-white">15K+</span> Likes</div></div>
                </div>
              </div>
              <div class="col-lg-10 pt-20px pb-20px">
                <div class="row align-items-center">
                  <div class="col-md-2 text-center"><span class="fw-600 text-uppercase text-white">26 Jun</span></div>
                  <div class="col-md-5 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start"><a href="https://www.youtube.com/" target="blank" class="text-medium-gray text-white-hover"><i class="bi bi-youtube text-white fs-20 me-10px align-middle"></i>I can't fight this feeling anymore</a></div>
                  <div class="col-md-2 col-xl-1 text-center"><span>03:35</span></div>
                  <div class="col-md-3 col-lg-2 d-flex justify-content-center align-items-center"><i class="bi bi-suit-heart-fill text-red icon-very-small lh-0px me-10px"></i><div class="fs-14 text-uppercase"><span class="fw-600 text-white">07K+</span> Likes</div></div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center mt-5 position-relative z-index-1 sm-mx-0 appear anime-child anime-complete" data-anime="{ &quot;el&quot;: &quot;childs&quot;, &quot;translateY&quot;: [30, 0], &quot;opacity&quot;: [0,1], &quot;duration&quot;: 600, &quot;delay&quot;: 1000, &quot;staggervalue&quot;: 300, &quot;easing&quot;: &quot;easeOutQuad&quot; }">
              <div class="col-lg-10">
                <div class="row align-items-center justify-content-center bg-dark-gray border-radius-100px p-15px">
                  <div class="col-auto fs-14 md-fs-12 text-uppercase fw-700 text-center"><span class="text-white">10,000+</span> Midnight vibration songs waiting for you <span class="ps-15px">&gt;</span></div>
                  <div class="col-auto align-items-center d-flex">
                    <a href="#">
                      <i class="bi bi-youtube text-white icon-small me-5px lh-0px align-middle"></i>
                      <span class="text-white fs-14 md-fs-12 fw-600 text-uppercase">Youtube</span>
                    </a>
                  </div>
                  <div class="col-auto"><div class="w-1px h-15px bg-white opacity-3"></div></div>
                  <div class="col-auto align-items-center d-flex">
                    <a href="#">
                      <i class="bi bi-apple text-white icon-small me-5px lh-0px align-middle"></i>
                      <span class="text-white fs-14 md-fs-12 fw-600 text-uppercase">Itunes</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default GestionarPage;