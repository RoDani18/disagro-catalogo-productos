import React, { useState } from "react";
import { IProductoCreate } from "../../../interfaces/producto";
import { ProductoService } from "../../../services/productoServices";
import { Alerta } from "../Alerta";
import "./formulario.css";
/**Formulario sobre productos */
export const FormularioProducto = () => {
  const productoService = new ProductoService();
  const [mensajeAlerta, setMensajeAlerta] = useState("");
const [tipoAlerta, setTipoAlerta] = useState<"exito" | "error" | "info">("info");

  const [producto, setProducto] = useState<IProductoCreate>({
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    categoria: "",
    stock: 0,
  });
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

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProducto({
      ...producto,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    });
  };

  const crearProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if(producto.codigo.trim()===""){
         alert ("Debe ingresar un codigo para continuar")
         return;
      }
      if(producto.nombre.trim()===""){
         alert ("Debe ingresar un nombre para continuar")
         return;
      }
      if(producto.descripcion.trim()===""){
         alert ("Debe ingresar una descripcion para continuar")
         return;
      }
      if(producto.precio <= 0){
         alert ("El precio debe de ser un valor positivo")
         return;
      }
      if(producto.categoria.trim()===""){
         alert ("Debe ingresar una categoria para continuar")
         return;
      }
      if(producto.stock < 0){
         alert ("El stock debe de ser un valor positivo")
         return;
      }
        if (window.confirm("¿Deseas crear el producto?")) {
          await productoService.createProducto(producto);
        setTipoAlerta("exito");
        setMensajeAlerta("Producto creado correctamente");
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      setTipoAlerta("error");
        setMensajeAlerta("Error al crear");
    }
    
  };

  return (
    <div className="form-container">
    
      <center>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s" alt="Logo Disagro" className ="logo"width="300" />
        <h1>Bienvenido al Sistema de Gestión de Productos de Disagro</h1>
        <h5>Por favor, complete el siguiente formulario para agregar un nuevo producto al catálogo:</h5>

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

    <button type="submit">
      Registrar Producto
    </button>

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
    </div>

  );
};