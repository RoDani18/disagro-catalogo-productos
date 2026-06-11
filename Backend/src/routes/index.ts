import { Router } from "express";
import { loginUsuario } from "../controllers/logincontroller";
import {
  crearProducto,
    eliminarProducto,
    getListarProductos as listarProductos,
    obtenerProducto,
    actualizarProducto as modificarProducto
} from "../controllers/productocontroller";

import { verificarToken, soloAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", loginUsuario);


router.get("/listado", verificarToken, listarProductos);
router.get("/producto/:id", verificarToken, obtenerProducto);


router.post("/crear", verificarToken, soloAdmin, crearProducto);
router.put("/modificar/:id", verificarToken, soloAdmin, modificarProducto);
router.delete("/eliminar/:id", verificarToken, soloAdmin, eliminarProducto);

export default router;