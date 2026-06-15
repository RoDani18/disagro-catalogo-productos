import "./confirmacion.css";

interface ConfirmacionProps {
  mensaje: string;
  confirmar: () => void;
  cancelar: () => void;
}

export const Confirmacion = ({ mensaje, confirmar, cancelar }: ConfirmacionProps) => {
  return (
    <div className="confirmacion-fondo">
      <div className="confirmacion-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s"
          alt="Logo Disagro"
          className="confirmacion-logo"
        />

        <h3>Confirmación</h3>

        <p>{mensaje}</p>

        <div className="confirmacion-botones">
          <button className="btn-confirmar" onClick={confirmar}>
            Sí, confirmar
          </button>

          <button className="btn-cancelar" onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};