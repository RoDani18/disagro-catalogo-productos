import { useState, useEffect } from "react";
import { IProducto } from "../../interfaces/producto";
import { ProductoService } from "../../services/productoServices";
import "./listadoproducto.css";

/** Listado de productos */
export const ListadoProducto = () => {

    const productoService = new ProductoService();

    const [productos, setProductos] = useState<IProducto[]>([]);

    const cargarProductos = async () => {
        try {
            const data = await productoService.getProductos();
            setProductos(data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
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
    alert("Producto eliminado correctamente");
    cargarProductos();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("Error al eliminar producto");
  }
};
const editarProducto = async (producto: IProducto) => {
  const nuevoNombre = window.prompt("Nuevo nombre:", producto.nombre);
  if (nuevoNombre === null) return;

  const nuevaDescripcion = window.prompt("Nueva descripción:", producto.descripcion);
  if (nuevaDescripcion === null) return;

  const nuevoPrecio = window.prompt("Nuevo precio:", String(producto.precio));
  if (nuevoPrecio === null) return;

  const nuevaCategoria = window.prompt("Nueva categoría:", producto.categoria);
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
    alert("Producto actualizado correctamente");
    cargarProductos();
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    alert("Error al actualizar producto");
  }
};
    return (
        <div className="listado-container">
            <center>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s" alt="Logo Disagro" className="logo" />
            <h2>Listado de Productos</h2>

            <table className="listado-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>Q {producto.precio}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <button onClick={() => editarProducto(producto)} className="btn-editar">Modificar</button>
                                <button onClick={() => eliminarProducto(producto.id)} className="btn-eliminar">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
<button onClick={() => window.location.href = "/"} className="btn-volver">Volver al Inicio</button>
<button onClick={() => window.location.href = "/crear"} className="btn-crear">Crear Producto</button>
</center>
        </div>
    );
};