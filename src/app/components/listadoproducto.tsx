import React, { useState, useEffect } from "react";
import { IProducto } from "../../interfaces/producto";
import { ProductoService } from "../../services/productoServices";
import { Alerta } from "./Alerta";
import { Confirmacion } from "./confirmacion";
import "./listadoproducto.css";

/** Listado de productos */
export const ListadoProducto = () => {
  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  const esAdmin = usuario?.rol === "Admin";

  const productoService = new ProductoService();

  const [productos, setProductos] = useState<IProducto[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const [productoEliminar, setProductoEliminar] = useState<IProducto | null>(null);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [productoEditado, setProductoEditado] = useState<IProducto | null>(null);

  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState<"exito" | "error" | "info">("info");

  const mostrarAlerta = (
    tipo: "exito" | "error" | "info",
    mensaje: string
  ) => {
    setTipoAlerta(tipo);
    setMensajeAlerta(mensaje);
  };

  const cargarProductos = async () => {
    try {
      const data = await productoService.getProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      mostrarAlerta("error", "Error al cargar los productos");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const pedirEliminarProducto = (producto: IProducto) => {
    setProductoEliminar(producto);
  };

  const confirmarEliminarProducto = async () => {
    if (!productoEliminar) return;

    try {
      await productoService.deleteProducto(productoEliminar.id);

      setProductoEliminar(null);
      mostrarAlerta("exito", "Producto eliminado correctamente");
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);

      setProductoEliminar(null);
      mostrarAlerta("error", "Error al eliminar producto");
    }
  };

  const iniciarEdicion = (producto: IProducto) => {
    setEditandoId(producto.id);
    setProductoEditado({ ...producto });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setProductoEditado(null);
  };

  const manejarCambioEdicion = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!productoEditado) return;

    const { name, value } = e.target;

    setProductoEditado({
      ...productoEditado,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    });
  };

  const guardarEdicion = async () => {
    if (!productoEditado) return;

    if (productoEditado.codigo.trim() === "") {
      mostrarAlerta("error", "El código no puede estar vacío");
      return;
    }

    if (productoEditado.nombre.trim() === "") {
      mostrarAlerta("error", "El nombre no puede estar vacío");
      return;
    }

    if (productoEditado.descripcion.trim() === "") {
      mostrarAlerta("error", "La descripción no puede estar vacía");
      return;
    }

    if (productoEditado.precio <= 0) {
      mostrarAlerta("error", "El precio debe ser mayor a 0");
      return;
    }

    if (productoEditado.categoria.trim() === "") {
      mostrarAlerta("error", "La categoría no puede estar vacía");
      return;
    }

    if (productoEditado.stock < 0) {
      mostrarAlerta("error", "El stock no puede ser negativo");
      return;
    }

    try {
      await productoService.updateProducto(productoEditado.id, productoEditado);

      mostrarAlerta("exito", "Producto actualizado correctamente");

      setEditandoId(null);
      setProductoEditado(null);

      cargarProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      mostrarAlerta("error", "Error al actualizar producto");
    }
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="listado-container">
      <center>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s"
          alt="Logo Disagro"
          className="logo"
        />

        <h2>Listado de Productos</h2>

        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        <table className="listado-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              {esAdmin && <th>Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    {editandoId === producto.id ? (
                      <input
                        name="codigo"
                        value={productoEditado?.codigo || ""}
                        onChange={manejarCambioEdicion}
                        className="input-editar"
                      />
                    ) : (
                      producto.codigo
                    )}
                  </td>

                  <td>
                    {editandoId === producto.id ? (
                      <input
                        name="nombre"
                        value={productoEditado?.nombre || ""}
                        onChange={manejarCambioEdicion}
                        className="input-editar"
                      />
                    ) : (
                      producto.nombre
                    )}
                  </td>

                  <td>
                    {editandoId === producto.id ? (
                      <input
                        name="descripcion"
                        value={productoEditado?.descripcion || ""}
                        onChange={manejarCambioEdicion}
                        className="input-editar"
                      />
                    ) : (
                      producto.descripcion
                    )}
                  </td>

                  <td>
                    {editandoId === producto.id ? (
                      <input
                        name="precio"
                        type="number"
                        value={productoEditado?.precio || 0}
                        onChange={manejarCambioEdicion}
                        className="input-editar"
                      />
                    ) : (
                      `Q ${producto.precio}`
                    )}
                  </td>

                  <td>
                    {editandoId === producto.id ? (
                      <input
                        name="categoria"
                        value={productoEditado?.categoria || ""}
                        onChange={manejarCambioEdicion}
                        className="input-editar"
                      />
                    ) : (
                      producto.categoria
                    )}
                  </td>

                  <td>
                    {editandoId === producto.id ? (
                      <input
                        name="stock"
                        type="number"
                        value={productoEditado?.stock || 0}
                        onChange={manejarCambioEdicion}
                        className="input-editar"
                      />
                    ) : (
                      producto.stock
                    )}
                  </td>

                  {esAdmin && (
                    <td className="td-acciones">
                      <div className="acciones-botones">
                        {editandoId === producto.id ? (
                          <>
                            <button
                              onClick={guardarEdicion}
                              className="btn-editar"
                            >
                              Guardar
                            </button>

                            <button
                              onClick={cancelarEdicion}
                              className="btn-eliminar"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => iniciarEdicion(producto)}
                              className="btn-editar"
                            >
                              Modificar
                            </button>

                            <button
                              onClick={() => pedirEliminarProducto(producto)}
                              className="btn-eliminar"
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={esAdmin ? 7 : 6}>
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          onClick={() => (window.location.href = "/")}
          className="btn-volver"
        >
          Volver al Inicio
        </button>

        {esAdmin && (
          <button
            onClick={() => (window.location.href = "/crear")}
            className="btn-crear"
          >
            Crear Producto
          </button>
        )}
      </center>

      {mensajeAlerta && (
        <Alerta
          mensaje={mensajeAlerta}
          tipo={tipoAlerta}
          cerrar={() => setMensajeAlerta("")}
        />
      )}

      {productoEliminar && (
        <Confirmacion
          mensaje={`¿Deseas eliminar el producto "${productoEliminar.nombre}"?`}
          confirmar={confirmarEliminarProducto}
          cancelar={() => setProductoEliminar(null)}
        />
      )}
    </div>
  );
};