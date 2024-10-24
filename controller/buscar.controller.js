import { request, response } from 'express'
import { isValidObjectId } from 'mongoose'
import { CategoriaModel, ProductModel, Usuario } from '../models/index.js'

const coleccionesPermitidas = [
  'usuarios',
  'categoria',
  'producto',
  'roles'
]

export const buscar = async (req = request, res = response) => {
  try {
    const { coleccion, termino } = req.params
    if (!(coleccionesPermitidas.includes(coleccion))) return res.status(400).json({ msg: `Esta no es una coleccion permitida, son: ${coleccionesPermitidas}` })

    switch (coleccion) {
      case 'usuarios':
        return res.json({ results: await buscarUsuraio(termino) })

      case 'categoria':
        return res.json({ results: await buscarCategorias(termino) })

      case 'producto':
        return res.json({ results: await buscarProductos(termino) })

      default:
        res.status(500).json({ msg: 'Se le olvido hacer esta busqueda' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: 'Error en el servidor' })
  }
}

async function buscarUsuraio (termino = '') {
  const isMongoID = isValidObjectId(termino)

  if (isMongoID) {
    const usuario = await Usuario.findById(termino)
    return (usuario) ? [usuario] : []
  }

  const regex = new RegExp(termino, 'i')

  const usuario = await Usuario.find({ $or: [{ nombre: regex }, { correo: regex }], $and: [{ estado: true }] })
  return (usuario) ? [usuario] : []
}

async function buscarCategorias (termino = '') {
  const isMongoID = isValidObjectId(termino)

  if (isMongoID) {
    const categoria = await CategoriaModel.findById(termino)
    return (categoria) ? [categoria] : []
  }

  const regex = new RegExp(termino, 'i')

  const categoria = await CategoriaModel.find({ $or: [{ nombre: regex }], $and: [{ estado: true }] })
  return (categoria) ? [categoria] : []
}

async function buscarProductos (termino = '') {
  const isMongoID = isValidObjectId(termino)

  if (isMongoID) {
    const producto = await ProductModel.findById(termino)
    return (producto) ? [producto] : []
  }

  const regex = new RegExp(termino, 'i')

  console.log('pasa')
  const producto = await ProductModel.find({ $or: [{ nombre: regex }], $and: [{ estado: true }] })
  return (producto) ? [producto] : []
}
