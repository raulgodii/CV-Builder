import ViewCV from "../components/ViewCV";
import { useAuth } from "../context/AuthContext";
import ReactDOMServer from "react-dom/server";
import { useMultiStep } from "../context/MultiStepContext";

function GestionarPage() {
  const { convertContext } = useAuth();
  const { data } = useMultiStep();

  const handleDownloadPDF = () => {
    const cvHTML = ReactDOMServer.renderToString( <ViewCV data={data} />);
    convertContext({ html: cvHTML });
  };

  return (
    <>
      <h1>Gestionar CV</h1>
      <button onClick={handleDownloadPDF}>Descargar PDF</button>
    </>
  );
}

export default GestionarPage;
