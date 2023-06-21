import express, { Application, Request, Response } from 'express'
import userRoutes from './routes/users'
import productRoutes from './routes/products'
import cors from 'cors'

import connectDB from './libs/db'

const app: Application = express()
const PORT = 3000
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (_req: Request, res: Response) => {
 res.send('API is running')
})

app.use('/users', userRoutes)
app.use('/products', productRoutes)

// Error handling middleware
app.use((err: any, _req: Request, res: Response) => {
 console.error(err.stack)
 res.status(500).json({ message: 'Internal Server Error' })
})

// Start the server
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`)
})
