import "./alerta.css";

interface AlertaProps {
  mensaje: string;
  tipo: "exito" | "error" | "info";
  cerrar: () => void;
}

export const Alerta = ({ mensaje, tipo, cerrar }: AlertaProps) => {
  return (
    <div className="alerta-fondo">
      <div className={`alerta-card ${tipo}`}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s"
          alt="Logo Disagro"
          className="alerta-logo"
        />

        <h3>
          {tipo === "exito" && "Operación exitosa"}
          {tipo === "error" && "Ocurrió un error"}
          {tipo === "info" && "Información"}
        </h3>

        <p>{mensaje}</p>

        <button onClick={cerrar} className="alerta-boton">
          Aceptar
        </button>
      </div>
    </div>
  );
};