import { useState } from "react";
import { api } from "../../config/axios";
import { Alerta } from "./Alerta";
import "./login.css";

export const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState<"exito" | "error" | "info">("info");

  const iniciarSesion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        correo: correo.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      setTipoAlerta("exito");
      setMensajeAlerta("Inicio de sesión exitoso");

      setTimeout(() => {
        window.location.href = "/";
      }, 1400);
    } catch (error: any) {
      console.error(error);

      setTipoAlerta("error");

      if (!error.response) {
        setMensajeAlerta("No se pudo conectar con el servidor");
      } else {
        setMensajeAlerta(error.response.data.mensaje);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s"
          alt="Logo Disagro"
          className="login-logo"
        />

        <h2 className="login-titulo">
          Sistema de Gestión de Productos
        </h2>

        <p className="login-subtitulo">
          Inicia sesión para consultar y administrar el catálogo agrícola de Disagro.
        </p>

        <form onSubmit={iniciarSesion} className="login-form">
          <div className="login-campo">
            <label>Correo:</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="login-campo">
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-ingresar">
            Ingresar
          </button>
        </form>

        <div className="login-footer">
          <p>Prueba Disagro • 2026</p>

        </div>
      </div>

      {mensajeAlerta && (
        <Alerta
          mensaje={mensajeAlerta}
          tipo={tipoAlerta}
          cerrar={() => setMensajeAlerta("")}
        />
      )}
    </div>
  );
};