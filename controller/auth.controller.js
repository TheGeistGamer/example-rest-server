/* eslint-disable camelcase */
import { googleVerify } from '../helpers/google-verify.js'
import { generarJWT } from '../helpers/generarJWT.js'
import { Usuario } from '../models/usuario.js'
import { request, response } from 'express'
import bcrypt from 'bcryptjs'

export const loginController = async (req = request, res = response) => {
  try {
    const { correo, password } = req.body

    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) return res.status(400).json({ error: 'Usuario / Password son incorrectos' })

    // Si el usuario esta activo
    if (!usuario.estado) return res.status(400).json({ error: 'Usuario / Password son incorrectos - estado: false' })

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' })

    // Generar e JWT
    const token = await generarJWT(usuario.id)

    res.json({ msg: 'ok', token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

export const googleSignIn = async (req = request, res = response) => {
  try {
    const { id_token } = req.body

    const { correo, nombre, img } = await googleVerify(id_token)

    let usuario = await Usuario.findOne({ correo })

    // Si no existe lo creo
    if (!usuario) {
      const data = {
        nombre,
        correo,
        img,
        password: ':p',
        google: true
      }

      usuario = new Usuario(data)
      await usuario.save()
    }

    // Si el usuario en DB
    if (!usuario.estado) return res.status(401).json({ err: 'Usuario bloqueado' })

    const token = await generarJWT(usuario.id)

    res.json({ usuario, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: 'Error en el servidor' })
  }
}
