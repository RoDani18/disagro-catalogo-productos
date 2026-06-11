import { useState, useEffect } from "react";
import { IProducto } from "../../interfaces/producto";
import { ProductoService } from "../../services/productoServices";
import { Alerta } from "./Alerta";
import "./listadoproducto.css";

/** Listado de productos */
export const ListadoProducto = () => {
  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  const esAdmin = usuario?.rol === "Admin";

  const productoService = new ProductoService();

  const [productos, setProductos] = useState<IProducto[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState<"exito" | "error" | "info">(
    "info"
  );

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

  const eliminarProducto = async (id: number) => {
    const confirmar = window.confirm("¿Deseas eliminar este producto?");

    if (!confirmar) {
      return;
    }

    try {
      await productoService.deleteProducto(id);

      mostrarAlerta("exito", "Producto eliminado correctamente");

      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);

      mostrarAlerta("error", "Error al eliminar producto");
    }
  };

  const editarProducto = async (producto: IProducto) => {
    const nuevoNombre = window.prompt("Nuevo nombre:", producto.nombre);
    if (nuevoNombre === null) return;

    const nuevaDescripcion = window.prompt(
      "Nueva descripción:",
      producto.descripcion
    );
    if (nuevaDescripcion === null) return;

    const nuevoPrecio = window.prompt("Nuevo precio:", String(producto.precio));
    if (nuevoPrecio === null) return;

    const nuevaCategoria = window.prompt(
      "Nueva categoría:",
      producto.categoria
    );
    if (nuevaCategoria === null) return;

    const nuevoStock = window.prompt("Nuevo stock:", String(producto.stock));
    if (nuevoStock === null) return;

    const productoActualizado = {
      ...producto,
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion,
      precio: Number(nuevoPrecio),
      categoria: nuevaCategoria,
      stock: Number(nuevoStock),
    };

    try {
      await productoService.updateProducto(producto.id, productoActualizado);

      mostrarAlerta("exito", "Producto actualizado correctamente");

      setTimeout(() => {
        window.location.reload();
      }, 1200);
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
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>Q {producto.precio}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.stock}</td>

                  {esAdmin && (
                    <td className="td-acciones">
                      <div className="acciones-botones">
                        <button
                          onClick={() => editarProducto(producto)}
                          className="btn-editar"
                        >
                          Modificar
                        </button>

                        <button
                          onClick={() => eliminarProducto(producto.id)}
                          className="btn-eliminar"
                        >
                          Eliminar
                        </button>
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
    </div>
  );
};