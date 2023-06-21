import { Request, Response } from 'express'
import User from '../models/users'
import { registerUser, loginUser } from './authController'

const createUser = async (req: Request, res: Response) => {
 // Utilizar la función registerUser del authController
 await registerUser(req, res)
}

const enterUser = async (req: Request, res: Response) => {
 // Utilizar la función registerUser del authController
 await loginUser(req, res)
}

const getAllUsers = async (_req: Request, res: Response) => {
 try {
  const users = await User.find()
  res.json(users)
 } catch (error) {
  console.error('Error al obtener los usuarios:', error)
  res.status(500).json({ message: 'Error en el servidor' })
 }
}

const getUserById = async (req: Request, res: Response) => {
 const { id } = req.params
 try {
  const user = await User.findById(id)
  if (!user) {
   return res.status(404).json({ message: 'Usuario no encontrado' })
  }
  return res.json(user) // Agregar el "return" aquí
 } catch (error) {
  console.error('Error al obtener el usuario:', error)
  return res.status(500).json({ message: 'Error en el servidor' })
 }
}

const updateUserById = async (req: Request, res: Response) => {
 const { id } = req.params
 const { username, password } = req.body
 try {
  const updatedUser = await User.findByIdAndUpdate(
   id,
   { username, password },
   { new: true }
  )
  if (!updatedUser) {
   return res.status(404).json({ message: 'Usuario no encontrado' })
  }
  return res.json(updatedUser) // Agregar el "return" aquí
 } catch (error) {
  console.error('Error al actualizar el usuario:', error)
  return res.status(500).json({ message: 'Error en el servidor' })
 }
}

const deleteUserById = async (req: Request, res: Response) => {
 const { id } = req.params
 try {
  const deletedUser = await User.findByIdAndDelete(id)
  if (!deletedUser) {
   return res.status(404).json({ message: 'Usuario no encontrado' })
  }
  return res.json({ message: 'Usuario eliminado exitosamente' }) // Agregar el "return" aquí
 } catch (error) {
  console.error('Error al eliminar el usuario:', error)
  return res.status(500).json({ message: 'Error en el servidor' })
 }
}

export default {
 createUser,
 enterUser,
 getAllUsers,
 getUserById,
 updateUserById,
 deleteUserById
}
