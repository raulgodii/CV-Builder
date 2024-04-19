import { useMultiStep } from "../context/MultiStepContext";
import ViewCV from "../components/ViewCV";

function GestionarPage() {
  const { data, updateData } = useMultiStep();

  return (
    <>
      <h1>Gestionar CV</h1>
      <ViewCV></ViewCV>
      <button>Descargar PDF</button>
    </>
    
  )
}

export default GestionarPage