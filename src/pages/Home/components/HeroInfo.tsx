import toast from "react-hot-toast";

export default function HeroInfo() {
  async function handleCopyIp() {
    try {
      await navigator.clipboard.writeText("play.mclimon.com");
      toast.success("IP copiada con éxito", { position: "bottom-center" });
    } catch (error) {
      console.error("Error copying text: ", error);
      toast.error("Hubo un error al copiar la IP");
    }
  }

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold capitalize">
          Servidor survival semi-vanilla
        </h1>

        <p className="text-center">
          MCLimón ha abierto sus puertas de nuevo, en su cuarto intento de
          mantenerse vivo más de seis meses
        </p>
      </div>

      <div className="mx-auto w-fit">
        <button
          className="minecraft-font cursor-pointer text-center text-2xl font-bold text-(--primary) uppercase transition-all hover:scale-105 hover:opacity-80"
          onClick={handleCopyIp}
          title="Haz clic para copiar la IP"
        >
          play.mclimon.com
        </button>
      </div>
    </>
  );
}
