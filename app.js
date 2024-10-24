import { Server } from './models/server.js'
import { PORT } from './config.js'

const server = new Server()

server.listen(PORT)
