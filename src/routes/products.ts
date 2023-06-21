import express from 'express'
import ProductController from '../controllers/productController'
import { adminPermission } from '../middlewares/permissionsMiddleware'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

// Ruta para obtener todos los productos
router.get('/', authMiddleware, ProductController.getAllProducts)

// Ruta para obtener un producto por ID
router.get('/:id', authMiddleware, ProductController.getProductById)

// Ruta para crear un nuevo producto (requiere permiso de administrador)
router.post(
 '/',
 authMiddleware,
 adminPermission,
 ProductController.createProduct
)

// Ruta para actualizar un producto por ID (requiere permiso de administrador)
router.put(
 '/:id',
 authMiddleware,
 adminPermission,
 ProductController.updateProductById
)

// Ruta para eliminar un producto por ID (requiere permiso de administrador)
router.delete(
 '/:id',
 authMiddleware,
 adminPermission,
 ProductController.deleteProductById
)

export default router
