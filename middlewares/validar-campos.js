import { validationResult } from 'express-validator'

export function ValidarCampos (req, res, next) {
  // Manejar Errores
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  next()
}
