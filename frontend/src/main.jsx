import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from "./context/AuthContext";
import { ResendProvider } from "./context/ResendContext";
import { MultiStepProvider } from "./context/MultiStepContext";

// Multi-Step
import Datos from "./components/multistep/perfil/Datos";
import Contacto from "./components/multistep/perfil/Contacto";
import Habilidades from "./components/multistep/habilidades/Habilidades";
import Formacion from "./components/multistep/formacion/Formacion";
import Experiencia from "./components/multistep/experiencia/Experiencia";
import Idiomas from "./components/multistep/idiomas/Idiomas";

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <ResendProvider>
            <MultiStepProvider steps={[<Datos />, <Contacto />, <Habilidades />, <Formacion />, <Experiencia />, <Idiomas />]}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </MultiStepProvider>
        </ResendProvider>
    </AuthProvider >
)
