import React, { useState } from "react";
import { IProductoCreate } from "../interfaces/producto";
import { ProductoService } from "../services/productoServices";

export const FormularioProducto = () => {
  const productoService = new ProductoService();

  const [producto, setProducto] = useState<IProductoCreate>({
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    categorias: "",
    stock: 0,
  });

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
      await productoService.createProducto(producto);
      alert("Producto creado correctamente");
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error al crear producto");
    }
  };

  return (
    <div>
      <h2>Formulario de Producto</h2>

      <form onSubmit={crearProducto}>
        <input name="codigo" placeholder="Código" onChange={manejarCambio} />
        <input name="nombre" placeholder="Nombre" onChange={manejarCambio} />
        <input name="descripcion" placeholder="Descripción" onChange={manejarCambio} />
        <input name="precio" type="number" placeholder="Precio" onChange={manejarCambio} />
        <input name="categorias" placeholder="Categorías" onChange={manejarCambio} />
        <input name="stock" type="number" placeholder="Stock" onChange={manejarCambio} />

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};