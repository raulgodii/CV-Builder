import { useResend } from "../context/ResendContext"

function HomePage() {
  const { sendEmail } = useResend();

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={sendEmail}>Enviar email</button>
    </>
  )
}

export default HomePage