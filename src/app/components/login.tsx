import { useState } from "react";
import { api } from "../../config/axios";
import "./login.css";

export const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        correo,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      alert("Inicio de sesión exitoso");

      window.location.href = "/";
    } catch (error) {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s" alt="" className="logo" />
      <h2>Iniciar Sesión</h2>

      <form onSubmit={iniciarSesion} className="form-container">
        <label htmlFor="">Correo: </label><input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};