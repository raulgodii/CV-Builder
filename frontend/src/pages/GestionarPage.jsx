import ViewCV from "../components/ViewCV";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";

function GestionarPage() {
  const { convertContext } = useAuth();
  const cvContainerRef = useRef(null);

  const handleDownloadPDF = () => {
    const cvHTML = cvContainerRef.current.innerHTML;
    convertContext({ html: cvHTML });
  };

  return (
    <>
      <h1>Gestionar CV</h1>
      <ViewCV ref={cvContainerRef} />
      <button onClick={handleDownloadPDF}>Descargar PDF</button>
    </>
  );
}

export default GestionarPage;
