/* eslint-disable camelcase */
import { subirArchivo } from '../helpers/subir-archivo.js'
import { ProductModel, Usuario } from '../models/index.js'
import { request, response } from 'express'
import { CLOUDINARY_URL } from '../config.js'
import fs from 'node:fs'

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config(CLOUDINARY_URL)

export const cargarArchivo = async (req = request, res = response) => {
  try {
    // Imagenes
    const pathCompleto = await subirArchivo(req.files, ['txt', 'md'])

    res.json({
      path: pathCompleto
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

export const actualizarImagen = async (req = request, res = response) => {
  try {
    const { id, coleccion } = req.params
    let modelo

    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id)
        if (!modelo) return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
        break

      case 'productos':
        modelo = await ProductModel.findById(id)
        if (!modelo) return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
        break

      default:
        return res.status(500).json({ msj: 'Se me olvido validar esto' })
    }

    // Limpiar imagenes previas
    if (modelo.img) if (fs.existsSync(modelo.img)) fs.unlinkSync(modelo.img)

    // Guardar imgane
    const nombre = await subirArchivo(req.files, undefined, coleccion)
    modelo.img = nombre

    // Guardar en BD
    await modelo.save()

    res.json({ modelo })
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

export const mostrarImagen = async (req = request, res = response) => {
  try {
    const { id, coleccion } = req.params

    let modelo

    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id)
        if (!modelo) return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
        break

      case 'productos':
        modelo = await ProductModel.findById(id)
        if (!modelo) return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
        break

      default: return res.status(400).json({ msj: 'Sin mas opciones' })
    }

    if (modelo.img) if (fs.existsSync(modelo.img)) return res.sendFile(modelo.img)

    res.json({ msg: 'Falta place holder' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

export const actualizarImagenCloudinary = async (req = request, res = response) => {
  try {
    const { id, coleccion } = req.params
    let modelo

    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id)
        if (!modelo) return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
        break

      case 'productos':
        modelo = await ProductModel.findById(id)
        if (!modelo) return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
        break

      default:
        return res.status(500).json({ msj: 'Se me olvido validar esto' })
    }

    // Limpiar imagenes previas
    // if (modelo.img) if (fs.existsSync(modelo.img)) fs.unlinkSync(modelo.img)

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    // Guardar imgane
    // const nombre = await subirArchivo(req.files, undefined, coleccion)
    modelo.img = secure_url

    // Guardar en BD
    await modelo.save()

    res.json({ modelo })
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' })
  }
}
