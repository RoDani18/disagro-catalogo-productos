import { useEffect, useState } from "react";
import { IProducto } from "../../../interfaces/producto";
import { ProductoService } from "../../../services/productoServices";
import "./ia.css";

export const IA = () => {
  const productoService = new ProductoService();

  const [productos, setProductos] = useState<IProducto[]>([]);
  const [opcion, setOpcion] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const cargarProductos = async () => {
    try {
      const data = await productoService.getProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setRespuesta("No se pudieron cargar los productos del catálogo.");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const consultarIA = () => {
    if (opcion === "") {
      setRespuesta("Seleccione una opción para realizar la consulta.");
      return;
    }

    if (opcion === "stock") {
      const sinStock = productos.filter((producto) => producto.stock === 0);
      const stockBajo = productos.filter(
        (producto) => producto.stock > 0 && producto.stock <= 10
      );
      const stockBueno = productos.filter((producto) => producto.stock > 10);

      let mensaje = "Análisis de stock del catálogo:\n\n";

      mensaje += "Productos sin stock:\n";
      mensaje +=
        sinStock.length > 0
          ? sinStock
              .map((p) => `- ${p.nombre} | Código: ${p.codigo} | Stock: ${p.stock}`)
              .join("\n")
          : "- No hay productos sin stock.";

      mensaje += "\n\nProductos con stock bajo:\n";
      mensaje +=
        stockBajo.length > 0
          ? stockBajo
              .map((p) => `- ${p.nombre} | Código: ${p.codigo} | Stock: ${p.stock}`)
              .join("\n")
          : "- No hay productos con stock bajo.";

      mensaje += "\n\nProductos con stock bueno:\n";
      mensaje +=
        stockBueno.length > 0
          ? stockBueno
              .map((p) => `- ${p.nombre} | Código: ${p.codigo} | Stock: ${p.stock}`)
              .join("\n")
          : "- No hay productos con stock bueno.";

      setRespuesta(mensaje);
      return;
    }

    if (opcion === "codigo") {
      if (busqueda.trim() === "") {
        setRespuesta("Ingrese el nombre del producto para buscar su código.");
        return;
      }

      const productoEncontrado = productos.find((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );

      if (!productoEncontrado) {
        setRespuesta("No se encontró un producto con ese nombre.");
        return;
      }

      setRespuesta(
        `El código del producto "${productoEncontrado.nombre}" es: ${productoEncontrado.codigo}`
      );
      return;
    }

    if (opcion === "precio") {
      if (busqueda.trim() === "") {
        setRespuesta(
          "Ingrese el código o nombre del producto para consultar su precio."
        );
        return;
      }

      const productoEncontrado = productos.find(
        (producto) =>
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.codigo.toLowerCase().includes(busqueda.toLowerCase())
      );

      if (!productoEncontrado) {
        setRespuesta("No se encontró un producto con ese código o nombre.");
        return;
      }

      setRespuesta(
        `El precio del producto "${productoEncontrado.nombre}" es: Q ${productoEncontrado.precio}`
      );
      return;
    }
  };

  const limpiarConsulta = () => {
    setOpcion("");
    setBusqueda("");
    setRespuesta("");
  };

  return (
    <div className="ia-container">
      <div className="ia-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_3uNi-sCFKxK6Q8K4oAyWyBjswmoLjBx4Q&s"
          alt="Logo Disagro"
          className="ia-logo"
        />

        <h1>Asistente Inteligente del Catálogo</h1>

        <p className="ia-descripcion">
          Selecciona una consulta para analizar la información de los productos
          registrados.
        </p>

        <div className="ia-form">
          <label>Seleccione una consulta:</label>

          <select value={opcion} onChange={(e) => setOpcion(e.target.value)}>
            <option value="">Seleccione una opción</option>
            <option value="stock">
              Ver productos con stock bajo, bueno o sin stock
            </option>
            <option value="codigo">
              Buscar código de un producto por nombre
            </option>
            <option value="precio">
              Buscar precio de un producto por código o nombre
            </option>
          </select>

          {(opcion === "codigo" || opcion === "precio") && (
            <>
              <label>Buscar producto:</label>
              <input
                type="text"
                placeholder={
                  opcion === "codigo"
                    ? "Ingrese el nombre del producto"
                    : "Ingrese el código o nombre del producto"
                }
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </>
          )}

          <div className="ia-botones">
            <button onClick={consultarIA} className="btn-consultar">
              Consultar
            </button>

            <button onClick={limpiarConsulta} className="btn-limpiar">
              Limpiar
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="btn-inicio"
            >
              Inicio
            </button>
          </div>
        </div>

        {respuesta && (
          <div className="ia-respuesta">
            <h3>Respuesta del asistente:</h3>
            <pre>{respuesta}</pre>
          </div>
        )}
      </div>
    </div>
  );
};