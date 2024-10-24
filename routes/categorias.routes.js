import { ValidarCampos } from '../middlewares/validar-campos.js'
import { check } from 'express-validator'
import { Router } from 'express'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { CategoriasController } from '../controller/categorias.controller.js'
import { existeCategory } from '../helpers/db-validators.js'
import { isAdminRole } from '../middlewares/validar-roles.js'

export const categoriasRouter = Router()

// Obtener todas las categorias - publico
categoriasRouter.get('/', CategoriasController.getCategorys)

// Obtener una categoria por id - publico
categoriasRouter.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategory),
  ValidarCampos
], CategoriasController.getCategory)

// Crear categoria - privado - cualquier persona con un token valido
categoriasRouter.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  ValidarCampos
], CategoriasController.crearCategoria)

// Actualizar - privado - cualquera con toke valido
categoriasRouter.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategory),
  ValidarCampos
], CategoriasController.updateCateogory)

// Borrar una categoria - Admin
categoriasRouter.delete('/:id', [
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategory),
  isAdminRole,
  ValidarCampos
], CategoriasController.deleteCateogory)
