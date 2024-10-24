import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from '../controller/user.controller.js'
import { emailExisting, esRoleValido, existeUsuarioById } from '../helpers/db-validators.js'
import { haveRole, validarJWT, ValidarCampos } from '../middlewares/index.js'
import { check } from 'express-validator'
import { Router } from 'express'

export const userRouter = Router()

userRouter.get('/', usuariosGet)

userRouter.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La Contraseña es obligatorio').isLength({ min: 6 }),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo', 'El correo ya existe').custom(emailExisting),
  check('rol').custom(esRoleValido),
  ValidarCampos
], usuariosPost)

userRouter.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id', 'No existe el ID').custom(existeUsuarioById),
  check('rol').custom(esRoleValido),
  ValidarCampos
], usuariosPut)

userRouter.delete('/:id', [
  validarJWT,
  // isAdminRole,
  haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id', 'No existe el ID').custom(existeUsuarioById),
  ValidarCampos
], usuariosDelete)
