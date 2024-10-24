import { buscar } from '../controller/buscar.controller.js'
import { Router } from 'express'

export const buscarRoutes = Router()

buscarRoutes.get('/:coleccion/:termino', buscar)
