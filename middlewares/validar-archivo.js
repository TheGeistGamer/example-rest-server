import { response } from 'express'

export const validarArchivoSubir = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ msg: 'No hay archivos que subir - archivo' })

  next()
}
