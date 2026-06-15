import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const SECRET_KEY = "disagro_2026";


interface UsuarioToken {
  id: number;
  correo: string;
  rol: string;
}


export interface RequestAuth extends Request {
  usuario?: UsuarioToken;
}

export const verificarToken = (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no enviado" });
  }

    

  const token = authHeader.split(" ")[1];

  try {
    const usuario = jwt.verify(token, SECRET_KEY) as UsuarioToken;
    req.usuario = usuario;
    const rolesPermitidos = ["Admin", "Usuario"];

if (!rolesPermitidos.includes(usuario.rol)) {
  return res.status(403).json({
    mensaje: "Rol no autorizado",
  });
}
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};

export const soloAdmin = (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  if (req.usuario?.rol !== "Admin") {
    return res.status(403).json({ mensaje: "Acceso solo para administrador" });
  }

  next();

  
};