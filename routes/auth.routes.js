import { googleSignIn, loginController } from '../controller/auth.controller.js'
import { ValidarCampos } from '../middlewares/validar-campos.js'
import { check } from 'express-validator'
import { Router } from 'express'

export const authRouters = Router()

authRouters.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  ValidarCampos
], loginController)

authRouters.post('/google', [
  check('id_token', 'Token de google es necesario').not().isEmpty(),
  ValidarCampos
], googleSignIn)
