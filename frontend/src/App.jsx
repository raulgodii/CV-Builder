import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ResendProvider } from "./context/ResendContext";
import { MultiStepProvider } from "./context/MultiStepContext";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from './components/Navbar';
import CrearPage from "./pages/CrearPage";
import GestionarPage from "./pages/GestionarPage";

// Multi-Step
import Datos from "./components/multistep/perfil/Datos";
import Contacto from "./components/multistep/perfil/Contacto";
import Habilidades from "./components/multistep/habilidades/Habilidades";
import Formacion from "./components/multistep/formacion/Formacion";
import Experiencia from "./components/multistep/experiencia/Experiencia";
import Idiomas from "./components/multistep/idiomas/Idiomas";

function App() {
  return (
    <AuthProvider>
      <ResendProvider>
        <MultiStepProvider steps={[<Datos />, <Contacto />, <Habilidades />, <Formacion />, <Experiencia />, <Idiomas />]}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/crear" element={<CrearPage />} />
                <Route path="/gestionar" element={<GestionarPage />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </MultiStepProvider>
      </ResendProvider>
    </AuthProvider >
  )
}

export default App