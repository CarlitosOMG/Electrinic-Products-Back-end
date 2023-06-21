import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'

interface DecodedToken extends JwtPayload {
 userId: string
 role: string
}

interface AuthenticatedRequest extends Request {
 userId?: string
 userRole?: string
}

const authMiddleware = (
 req: AuthenticatedRequest,
 res: Response,
 next: NextFunction
) => {
 // Verificar la presencia del token JWT en el encabezado de la solicitud
 const token = req.header('Authorization')?.replace('Bearer ', '')

 if (!token) {
  return res
   .status(401)
   .json({ message: 'Acceso no autorizado. Token no proporcionado.' })
 }
 try {
  // Verificar y decodificar el token
  const decoded = jwt.verify(token, config.SECRET) as DecodedToken
  req.userId = decoded.userId
  req.userRole = decoded.role
  next()
  return // Agregar este return para solucionar el warning
 } catch (error) {
  console.error('Error en la verificación del token:', error)
  res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' })
  return // Agregar este return para solucionar el warning
 }
}

export default authMiddleware
