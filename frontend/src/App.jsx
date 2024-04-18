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

function App() {
  return (
    <AuthProvider>
      <ResendProvider>
        <MultiStepProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/crear" element={<CrearPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </MultiStepProvider>
      </ResendProvider>
    </AuthProvider >
  )
}

export default App