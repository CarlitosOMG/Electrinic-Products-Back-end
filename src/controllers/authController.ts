import { Request, Response } from 'express'
import User, { IUser } from '../models/users'
import { generateAuthToken } from '../helpers/authHelpers'
import bcrypt from 'bcrypt'

export const registerUser = async (req: Request, res: Response) => {
 const { username, password, role } = req.body

 try {
  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await User.findOne({ username })
  if (existingUser) {
   return res.status(400).json({ message: 'El usuario ya existe' })
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10)

  // Crear un nuevo usuario con el rol proporcionado y la contraseña encriptada
  const newUser: IUser = new User({ username, password: hashedPassword, role })
  await newUser.save()

  // Generar el token de autenticación con la misma duración de expiración
  const expiresIn = '1d' // Duración de 1 día (puedes ajustarla según tus necesidades)
  const token = generateAuthToken(newUser, expiresIn)

  // Enviar la respuesta con el token
  res.json({ token })
 } catch (error) {
  console.error('Error al registrar el usuario:', error)
  res.status(500).json({ message: 'Error en el servidor' })
 }
 return
}

export const loginUser = async (req: Request, res: Response) => {
 const { username, password } = req.body

 try {
  // Buscar al usuario en la base de datos
  const user = await User.findOne({ username })
  if (!user) {
   return res.status(401).json({ message: 'Credenciales inválidas' })
  }

  // Verificar la contraseña
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
   return res.status(401).json({ message: 'Credenciales inválidas' })
  }

  // Obtener el rol del usuario
  const userRole = user.role // Suponiendo que el campo del rol se llama 'role'

  // Generar el token de autenticación con la misma duración de expiración
  const expiresIn = '1d' // Duración de 1 día (puedes ajustarla según tus necesidades)
  const token = generateAuthToken(user, expiresIn)

  // Enviar la respuesta con el token y el rol del usuario
  res.json({ token, role: userRole })
 } catch (error) {
  console.error('Error al iniciar sesión:', error)
  res.status(500).json({ message: 'Error en el servidor' })
 }
 return
}
