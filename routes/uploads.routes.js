import { actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from '../controller/uploads.controller.js'
import { validarArchivoSubir } from '../middlewares/validar-archivo.js'
import { coleccionesPermitidas } from '../helpers/db-validators.js'
import { ValidarCampos } from '../middlewares/validar-campos.js'
import { check } from 'express-validator'
import { Router } from 'express'

export const uploadsRoutes = Router()

uploadsRoutes.post('/', validarArchivoSubir, cargarArchivo)

uploadsRoutes.put('/:coleccion/:id', [
  validarArchivoSubir,
  check('id', 'El id debe de ser de mongo').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  ValidarCampos
], actualizarImagenCloudinary)

uploadsRoutes.get('/:coleccion/:id', [
  check('id', 'El id debe de ser de mongo').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  ValidarCampos

], mostrarImagen)
