import { request, response } from 'express'
import { ProductModel } from '../models/index.js'

export class ProductosController {
  static getProductos = async (req = request, res = response) => {
    try {
      const { limite = 5, desde = 0 } = req.query

      const [total, categorias] = await Promise.all([
        ProductModel.countDocuments({ estado: true }),

        ProductModel.find({ estado: true })
          .populate('usuario', 'nombre')
          .skip(Number(desde))
          .limit(Number(limite))
      ])

      res.json({ total, categorias })
    } catch (error) {
      res.status(500).json({ err: 'Error en el servidor' })
    }
  }

  static getProduct = async (req = request, res = response) => {
    try {
      const { id } = req.params
      const getCategory = await ProductModel.findById(id).populate('usuario', 'nombre')
      res.json({ getCategory })
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: 'Error en el servidor' })
    }
  }

  static postProduct = async (req = request, res = response) => {
    try {
      const { nombre, precio, descripcion, categoria } = req.body

      const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.userAuth._id,
        precio,
        categoria,
        descripcion
      }
      // Generar el schema
      const producto = new ProductModel(data)

      // Guardar en Base de Datos
      await producto.save()

      // Enviar
      res.status(201).json(producto)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error en el servidor' })
    }
  }

  static updateProduct = async (req = request, res = response) => {
    try {
      const { id } = req.params
      const { estado, usuario, disponible, ...data } = req.body

      data.nombre = data.nombre.toUpperCase()
      data.usuario = req.userAuth._id

      const categoria = await ProductModel.findByIdAndUpdate(id, data, { new: true })

      res.json({ categoria })
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: 'Error en el servidor' })
    }
  }

  // BorrarCategoria
  static deleteProduct = async (req = request, res = response) => {
    try {
      const { id } = req.params

      const categoria = await ProductModel.findByIdAndUpdate(id, { estado: false }, { new: true })
      const usuarioAuth = req.userAuth

      res.json({ usuarioAuth, categoria })
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: 'Erro en el servidor' })
    }
  }
}
