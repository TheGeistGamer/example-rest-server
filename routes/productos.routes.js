import { ProductosController } from '../controller/productos.controller.js'
import { ValidarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { check } from 'express-validator'
import { Router } from 'express'
import { existName, existProduct, existeCategory } from '../helpers/db-validators.js'
import { isAdminRole } from '../middlewares/validar-roles.js'

export const ProductosRouter = Router()

// Obtener todas las categorias - publico
ProductosRouter.get('/', ProductosController.getProductos)

// Obtener una categoria por id - publico
ProductosRouter.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existProduct),
  ValidarCampos
], ProductosController.getProduct)

// Agregar nuevo producto
ProductosRouter.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un ID válido').isMongoId(),
  check('precio', 'No es un número').isNumeric(),
  check('categoria').custom(existeCategory),
  check('nombre').custom(existName),
  ValidarCampos
], ProductosController.postProduct)

// Actualizar - privado - cualquera con toke valido
ProductosRouter.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un ID válido').isMongoId(),
  check('categoria').custom(existeCategory),
  check('id').custom(existProduct),
  check('precio', 'No es un número').isNumeric(),
  ValidarCampos
], ProductosController.updateProduct)

// Borrar una categoria - Admin
ProductosRouter.delete('/:id', [
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existProduct),
  isAdminRole,
  ValidarCampos
], ProductosController.deleteProduct)
