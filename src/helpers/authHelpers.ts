import jwt from 'jsonwebtoken'
import { IUser } from '../models/users'
import config from '../config'
/*
const generateAuthToken = (user: IUser) => {
 const secretKey = config.SECRET // Reemplaza esto con tu propia clave secreta
 const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, {
  expiresIn: 86400 // Tiempo de expiración del token
 })
 return token
}*/

const generateAuthToken = (user: IUser, expiresIn: string) => {
 const secretKey = config.SECRET // Reemplaza esto con tu propia clave secreta
 const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, {
  expiresIn // Tiempo de expiración del token
 })
 return token
}

export { generateAuthToken }
