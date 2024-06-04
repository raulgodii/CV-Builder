import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ResendProvider } from "./context/ResendContext";
import { CvProvider } from "./context/CvContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from './components/Navbar';
import CrearPage from "./pages/CrearPage";
import ModificarPage from "./pages/ModificarPage";
import GestionarPage from "./pages/GestionarPage";
import DetallePage from "./pages/DetallePage";
import ErrorPage from "./pages/ErrorPage";

// Multi-Step
import Datos from "./components/multistep/perfil/Datos";
import Contacto from "./components/multistep/perfil/Contacto";
import Habilidades from "./components/multistep/habilidades/Habilidades";
import Formacion from "./components/multistep/formacion/Formacion";
import Experiencia from "./components/multistep/experiencia/Experiencia";
import Idiomas from "./components/multistep/idiomas/Idiomas";

// Multi-Step
// import { useMultiStep } from './context/MultiStepContext';
function App() {
  // const location = useLocation();
  // const { step, domLoaded } = useMultiStep();

  // useEffect(() => {
  //   // Define las URLs de los scripts que deseas cargar
  //   const scriptUrls = [
  //     "/js/main.js"
  //   ];

  //   // Define la función para cargar un script
  //   var loadJS = function (url, implementationCode, location) {
  //     var scriptTag = document.createElement('script');
  //     scriptTag.src = url;

  //     scriptTag.onload = implementationCode;
  //     scriptTag.onreadystatechange = implementationCode;

  //     location.appendChild(scriptTag);
  //   };

  //   // Carga los scripts cuando cambia la ubicación de la ruta
  //   scriptUrls.forEach(scriptUrl => {
  //     loadJS(scriptUrl, function () {
  //     }, document.body);
  //   });

  // }, [location.pathname, step, domLoaded]);

  return (
    <>
      <GoogleOAuthProvider clientId="1059929085491-c5it7tt92klhkg3iah0dbj9bbdig6671.apps.googleusercontent.com">
        <AuthProvider>
          <ResendProvider>
            <CvProvider steps={[<Datos />, <Contacto />, <Habilidades />, <Formacion />, <Experiencia />, <Idiomas />]}>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/404" element={<ErrorPage />} />

                  <Route element={<ProtectedRoute />}>
                    {/* <Route path="/profile" element={<ProfilePage />} /> */}
                    <Route path="/crear/:id" element={<CrearPage />} />
                    <Route path="/modificar/:id" element={<ModificarPage />} />
                    <Route path="/gestionar" element={<GestionarPage />} />
                    <Route path="/gestionar/:id" element={<DetallePage />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </CvProvider>
          </ResendProvider>
        </AuthProvider >
      </GoogleOAuthProvider>
    </>
  )
}

export default App