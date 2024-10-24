import { request, response } from 'express'
import { SECRET_KEY } from '../config.js'
import jwt from 'jsonwebtoken'
import { Usuario } from '../models/usuario.js'

export const validarJWT = async (req = request, res = response, next) => {
  try {
    const token = req.header('Authorization')
    // Exite?
    if (!token) return res.status(401).json({ err: 'No hay token en la peticion' })

    // Verifica la validez del token
    const { uid } = jwt.verify(token, SECRET_KEY)

    // Encuentra al usuario
    const user = await Usuario.findById({ _id: uid })

    // Saber si el usuario no existe
    if (!user) return res.status(404).json({ err: 'Usuario no existe' })

    // Verificar si el uid tiene estado true
    if (!user.estado) return res.status(401).json({ err: 'Token no valido - usuario no existe' })

    req.userAuth = user
    req.uid = uid

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ err: 'Token no valido' })
  }
}
