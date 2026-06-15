import React, { useState } from "react";
import { IProductoCreate } from "../../../interfaces/producto";
import { ProductoService } from "../../../services/productoServices";
import { Alerta } from "../Alerta";
import { Confirmacion } from "../confirmacion";
import "./formulario.css";

/** Formulario sobre productos */
export const FormularioProducto = () => {
  const productoService = new ProductoService();

  const [producto, setProducto] = useState<IProductoCreate>({
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    categoria: "",
    stock: 0,
  });

  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState<"exito" | "error" | "info">("info");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProducto({
      ...producto,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setProducto({
      codigo: "",
      nombre: "",
      descripcion: "",
      precio: 0,
      categoria: "",
      stock: 0,
    });
  };

  const mostrarMensaje = (tipo: "exito" | "error" | "info", mensaje: string) => {
    setTipoAlerta(tipo);
    setMensajeAlerta(mensaje);
  };

  const crearProducto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (producto.codigo.trim() === "") {
      mostrarMensaje("error", "Debe ingresar un código para continuar");
      return;
    }

    if (producto.nombre.trim() === "") {
      mostrarMensaje("error", "Debe ingresar un nombre para continuar");
      return;
    }

    if (producto.descripcion.trim() === "") {
      mostrarMensaje("error", "Debe ingresar una descripción para continuar");
      return;
    }

    if (producto.precio <= 0) {
      mostrarMensaje("error", "El precio debe ser un valor positivo");
      return;
    }

    if (producto.categoria.trim() === "") {
      mostrarMensaje("error", "Debe ingresar una categoría para continuar");
      return;
    }

    if (producto.stock < 0) {
      mostrarMensaje("error", "El stock debe ser un valor positivo");
      return;
    }

    setMostrarConfirmacion(true);
  };

 const confirmarCrearProducto = async () => {
  try {
    await productoService.createProducto(producto);

    setMostrarConfirmacion(false);
    limpiarFormulario();

    setTipoAlerta("exito");
    setMensajeAlerta("Producto creado correctamente");
  } catch (error: any) {
    console.error("Error completo:", error);
    console.error("Respuesta backend:", error.response?.data);

    setMostrarConfirmacion(false);
    setTipoAlerta("error");

    setMensajeAlerta(
      error.response?.data?.mensaje ||
      error.response?.data?.error ||
      "Error al crear el producto"
    );
  }
  };

  return (
    <div className="form-container">
      <center>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s"
          alt="Logo Disagro"
          className="logo"
          width="300"
        />

        <h1>Bienvenido al Sistema de Gestión de Productos de Disagro</h1>

        <h5>
          Por favor, complete el siguiente formulario para agregar un nuevo
          producto al catálogo:
        </h5>

        <form onSubmit={crearProducto} className="formulario-producto">
          <div className="fila-formulario">
            <label>Código:</label>
            <input
              name="codigo"
              placeholder="EJ: FER-001"
              value={producto.codigo}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="fila-formulario">
            <label>Nombre:</label>
            <input
              name="nombre"
              placeholder="EJ: Fertilizante"
              value={producto.nombre}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="fila-formulario">
            <label>Descripción:</label>
            <input
              name="descripcion"
              placeholder="EJ: Fertilizante orgánico para cultivos"
              value={producto.descripcion}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="fila-formulario">
            <label>Precio:</label>
            <input
              name="precio"
              type="number"
              placeholder="EJ: 10000"
              value={producto.precio === 0 ? "" : producto.precio}
              onChange={manejarCambio}
              required
              min="1"
            />
          </div>

          <div className="fila-formulario">
            <label>Categoría:</label>
            <input
              name="categoria"
              placeholder="EJ: Fertilizantes"
              value={producto.categoria}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="fila-formulario">
            <label>Stock:</label>
            <input
              name="stock"
              type="number"
              placeholder="EJ: 100"
              value={producto.stock === 0 ? "" : producto.stock}
              onChange={manejarCambio}
              required
              min="0"
            />
          </div>

          <div className="botones-formulario">
            <button type="submit">Registrar Producto</button>

            <button
              type="button"
              className="btn limpiar"
              onClick={limpiarFormulario}
            >
              Limpiar Formulario
            </button>

            <button
              type="button"
              onClick={() => (window.location.href = "/productos")}
              className="btn-listado"
            >
              Ver Productos
            </button>

            <button
              type="button"
              className="btn inicio"
              onClick={() => (window.location.href = "/")}
            >
              Inicio
            </button>
          </div>
        </form>
      </center>

      {mensajeAlerta && (
        <Alerta
          mensaje={mensajeAlerta}
          tipo={tipoAlerta}
          cerrar={() => setMensajeAlerta("")}
        />
      )}

      {mostrarConfirmacion && (
        <Confirmacion
          mensaje="¿Deseas crear este producto?"
          confirmar={confirmarCrearProducto}
          cancelar={() => setMostrarConfirmacion(false)}
        />
      )}
    </div>
  );
};