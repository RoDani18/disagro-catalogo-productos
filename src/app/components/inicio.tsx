import { useNavigate } from "react-router-dom";
import "./inicio.css";


export const Inicio = () => {
  const navigate = useNavigate();

  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div className="inicio-container">
      <div className="inicio-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s"
          alt="Logo Disagro"
          className="inicio-logo"
        />

        <h1>Catálogo de Productos</h1>

        <p className="bienvenida">
          Bienvenido, <strong>{usuario?.nombre}</strong>
        </p>

        <p className="rol">
          Rol: <strong>{usuario?.rol}</strong>
        </p>

        <p className="descripcion">
          Sistema para consultar, crear, modificar y administrar productos del
          catálogo de Disagro.
        </p>

        <div className="opciones">
  <button onClick={() => navigate("/productos")} className="opcion-card">
    <span>📦</span>
    <strong>Ver productos</strong>
    <small>Consulta el catálogo disponible</small>
  </button>

  {usuario?.rol === "Admin" && (
    <button onClick={() => navigate("/crear")} className="opcion-card">
      <span>➕</span>
      <strong>Crear producto</strong>
      <small>Agrega nuevos productos</small>
    </button>
  )}

  <button onClick={() => navigate("/ia")} className="opcion-card">
    <span>🤖</span>
    <strong>Asistente Virtual</strong>
    <small>Consulta recomendaciones básicas</small>
  </button>
</div>

<button className="btn-salir" onClick={cerrarSesion}>
  Cerrar sesión
</button>
        </div>
      </div>
  
  );
};