import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/database";

const SECRET_KEY = "disagro2026";

export const loginUsuario = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  try {
    const resultado = await db.query(
      "SELECT id, nombre, correo, rol FROM usuarios WHERE correo = $1 AND contra = $2",
      [correo, password]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const usuario = resultado.rows[0];

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};