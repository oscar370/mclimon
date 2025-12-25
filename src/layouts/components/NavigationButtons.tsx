import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

export default function NavigationButtons() {
  const navigate = useNavigate();
  const currentUrl = location.pathname;

  function handleGoTo(to: string) {
    navigate(to);
  }

  return (
    <>
      <Button
        variant="flat"
        state={currentUrl === "/" ? "active" : "normal"}
        onClick={() => handleGoTo("/")}
      >
        Inicio
      </Button>

      <Button
        variant="flat"
        state={currentUrl.startsWith("/tutorials") ? "active" : "normal"}
        onClick={() => handleGoTo("/tutorials/primeros-pasos")}
      >
        Tutoriales
      </Button>
    </>
  );
}
