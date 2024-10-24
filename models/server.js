import { categoriasRouter, authRouters, userRouter, ProductosRouter, buscarRoutes, uploadsRoutes } from '../routes/index.js'
import { dbConnection } from '../database/config.js'
import fileUpload from 'express-fileupload'
import express from 'express'
import cors from 'cors'

export class Server {
  constructor () {
    this.app = express()

    // Connectar a la base de datos
    this.conectarDB()

    // Middleware
    this.middlewares()

    // Rutas
    this.routes()
  }

  async conectarDB () {
    await dbConnection()
  }

  middlewares () {
    // CORS
    this.app.use(cors())
    // Directorio Publico
    this.app.use(express.static('public'))
    // Lectura y parseo del body
    this.app.use(express.json())
    // Carga de archivo
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }))
  }

  routes () {
    this.app.use('/api/usuarios', userRouter)
    this.app.use('/api/auth', authRouters)
    this.app.use('/api/categorias', categoriasRouter)
    this.app.use('/api/productos', ProductosRouter)
    this.app.use('/api/buscar', buscarRoutes)
    this.app.use('/api/uploads', uploadsRoutes)
  }

  listen (PORT) {
    this.app.listen(PORT, () => {
      console.log(`Server on port: http://localhost:${PORT}`)
    })
  }
}
