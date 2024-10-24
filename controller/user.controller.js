import { response, request } from 'express'
import { Usuario } from '../models/usuario.js'
import bcryptjs from 'bcryptjs'

export const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  res.json({ total, usuarios })
}

export const usuariosPost = async (req = request, res = response) => {
  try {
    // Manejar el State
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en DB
    await usuario.save()

    res.json({ usuario })
  } catch (error) {
    console.log(error)
    res.status(500).json()
  }
}

export const usuariosPut = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const { password, google, ...rest } = req.body

    // Encriptar la contraseña
    if (password) {
      const salt = bcryptjs.genSaltSync()
      rest.password = bcryptjs.hashSync(password, salt)
    }

    // Actualizar a la base de datos
    await Usuario.findByIdAndUpdate(id, rest)

    res.status(201).json({ message: 'ok' })
  } catch (error) {
    console.error(error)
    res.status(500).json()
  }
}

export const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params

  // Borrar ficiamente
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
  const usuarioAuth = req.userAuth

  res.json({ usuario, usuarioAuth })
}
