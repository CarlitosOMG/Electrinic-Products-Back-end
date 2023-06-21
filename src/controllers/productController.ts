import { Request, Response } from 'express'
import Product from '../models/products'
import { IProduct } from '../models/products'

const getAllProducts = async (_req: Request, res: Response) => {
 try {
  const products = await Product.find()
  res.json(products)
 } catch (error) {
  console.error('Error al obtener los productos:', error)
  res.status(500).json({ message: 'Error en el servidor' })
 }
}

const createProduct = async (req: Request, res: Response) => {
 const {
  website,
  title,
  original_price,
  discount_price,
  offer_url,
  is_offer_day,
  is_available,
  delivery_is_free,
  category,
  discount_percentage,
  image,
  rating,
  sales
 } = req.body

 try {
  // Crear una instancia del nuevo producto
  const newProduct: IProduct = new Product({
   website,
   title,
   original_price,
   discount_price,
   offer_url,
   is_offer_day,
   is_available,
   delivery_is_free,
   category: {
    Id: category.Id,
    Name: category.Name
   },
   discount_percentage,
   image,
   rating: {
    rating: rating.rating,
    amount: rating.amount
   },
   sales: {
    days: sales.days,
    amount: sales.amount
   }
  })

  // Guardar el nuevo producto en la base de datos
  await newProduct.save()

  res
   .status(201)
   .json({ message: 'Producto creado exitosamente', product: newProduct })
 } catch (error) {
  console.error('Error al crear el producto:', error)
  res.status(500).json({ message: 'Error en el servidor' })
 }
}

const updateProductById = async (req: Request, res: Response) => {
 const { id } = req.params
 const { title, original_price } = req.body
 try {
  const updatedProduct = await Product.findByIdAndUpdate(
   id,
   { title, original_price },
   { new: true }
  )
  if (!updatedProduct) {
   return res.status(404).json({ message: 'Producto no encontrado' })
  }
  return res.json(updatedProduct)
 } catch (error) {
  console.error('Error al actualizar el producto:', error)
  return res.status(500).json({ message: 'Error en el servidor' })
 }
}

const deleteProductById = async (req: Request, res: Response) => {
 const { id } = req.params
 try {
  const deletedProduct = await Product.findByIdAndDelete(id)
  if (!deletedProduct) {
   return res.status(404).json({ message: 'Producto no encontrado' })
  }
  return res.json({ message: 'Producto eliminado exitosamente' })
 } catch (error) {
  console.error('Error al eliminar el producto:', error)
  return res.status(500).json({ message: 'Error en el servidor' })
 }
}

const getProductById = async (req: Request, res: Response) => {
 const { id } = req.params
 try {
  const product = await Product.findById(id)
  if (!product) {
   return res.status(404).json({ message: 'Producto no encontrado' })
  }
  return res.json(product)
 } catch (error) {
  console.error('Error al obtener el producto:', error)
  return res.status(500).json({ message: 'Error en el servidor' })
 }
}

export default {
 getAllProducts,
 getProductById,
 createProduct,
 updateProductById,
 deleteProductById
}
