import express from 'express'
import UserController from '../controllers/userController'
import { adminPermission } from '../middlewares/permissionsMiddleware'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

// Ruta para registrar un nuevo usuario
router.post('/register', UserController.createUser)

// Ruta para iniciar sesion
router.post('/login', UserController.enterUser)

// Ruta para obtener todos los usuarios (requiere permiso de administrador)
router.get('/', authMiddleware, adminPermission, UserController.getAllUsers)

// Ruta para obtener un usuario por ID (requiere permiso de administrador)
router.get('/:id', authMiddleware, adminPermission, UserController.getUserById)

// Ruta para actualizar un usuario por ID (requiere permiso de administrador)
router.put(
 '/:id',
 authMiddleware,
 adminPermission,
 UserController.updateUserById
)

// Ruta para eliminar un usuario por ID (requiere permiso de administrador)
router.delete(
 '/:id',
 authMiddleware,
 adminPermission,
 UserController.deleteUserById
)

export default router
