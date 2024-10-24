/* eslint-disable prefer-promise-reject-errors */
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

export const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' }, (error, token) => {
      if (error) reject('No se pudo generar el token')
      else resolve(token)
    })
  })
}
