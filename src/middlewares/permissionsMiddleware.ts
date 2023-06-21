import { Request, Response, NextFunction } from 'express'

interface AuthenticatedRequest extends Request {
 userId?: string
 userRole?: string
}

const adminPermission = (
 req: AuthenticatedRequest,
 res: Response,
 next: NextFunction
) => {
 const userRole = req.userRole
 if (userRole !== 'admin') {
  return res
   .status(403)
   .json({ message: 'Acceso denegado. Permiso de administrador requerido.' })
 }
 return next()
}
/*
const userPermission = (
 req: AuthenticatedRequest,
 res: Response,
 next: NextFunction
) => {
 const userRole = req.userRole
 if (userRole !== 'user' && userRole !== 'admin') {
  return res
   .status(403)
   .json({ message: 'Acceso denegado. Permiso de usuario requerido.' })
 }
 next()
 return // Agregar este return para solucionar el warning
}
*/
export { adminPermission }
