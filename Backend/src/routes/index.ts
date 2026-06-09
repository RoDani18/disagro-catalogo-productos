import { Router } from "express";
import { db } from "../config/database";
import { getListarProductos,crearProducto, actualizarProducto, eliminarProducto } from "../controllers/productocontroller";

export const router = Router();
router.get("/listado", getListarProductos);
router.post("/crear", crearProducto);
router.delete("/eliminar/:id", eliminarProducto);
router.put("/modificar/:id", actualizarProducto);