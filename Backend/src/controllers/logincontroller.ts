import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/database";

const SECRET_KEY = "disagro_2026";

export const loginUsuario = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  try {
    if (!correo || !password) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios",
      });
    }

    const correoLimpio = correo.trim();
    const passwordLimpio = password.trim();

    const resultado = await db.query(
      `SELECT id, nombre, correo, rol 
       FROM usuarios 
       WHERE correo = $1 
       AND contra = $2`,
      [correoLimpio, passwordLimpio]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas",
      });
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

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario,
    });
  } catch (error) {
    console.error("Error en login:", error);

    return res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
};