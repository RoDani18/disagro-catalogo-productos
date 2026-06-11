import { Request, Response } from "express";
import { db } from "../config/database";

export const getListarProductos = (req: Request, res: Response) => {
  db.query("SELECT * FROM productos ORDER BY id ASC")
    .then((result) => {     
        res.json(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el listado de productos" });
    }); 
};

export const crearProducto = (req: Request, res: Response) => {
  const { codigo, nombre, descripcion, precio,categoria, stock } = req.body; 
    db.query(   
    "INSERT INTO productos (codigo, nombre, descripcion, precio, categoria, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [codigo, nombre, descripcion, precio,categoria, stock]
  ) 
    .then((result) => {
        return res.status(201).json(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al crear el producto" });
    });
};

export const eliminarProducto = (req: Request, res: Response) => {
  const { id } = req.params;
    db.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id])
    .then((result) => {
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        return res.json({ message: "Producto eliminado correctamente" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el producto" });
    });
};

export const actualizarProducto = (req: Request, res: Response) => {
    const { id } = req.params;
    const { codigo, nombre, descripcion, precio,categoria, stock } = req.body;
    db.query(
    "UPDATE productos SET codigo = $1, nombre = $2, descripcion = $3, precio = $4, categoria = $5, stock = $6 WHERE id = $7 RETURNING *",
    [codigo, nombre, descripcion, precio,categoria, stock, id]
  ) 
    .then((result) => {
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el producto" });
    }); 
};

export const obtenerProducto = (req: Request, res: Response) => {
    const { id } = req.params;  
    db.query("SELECT * FROM productos WHERE id = $1", [id])
    .then((result) => {
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }   
        res.json(result.rows[0]);
    }
    ) 
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el producto" });
    }); 
};