import { request, response } from 'express'
import { CategoriaModel } from '../models/categoria.model.js'

export class CategoriasController {
  // ObtenerCategorias - paginado - total -populate
  static getCategorys = async (req = request, res = response) => {
    try {
      const { limite = 5, desde = 0 } = req.query

      const [total, categorias] = await Promise.all([
        CategoriaModel.countDocuments({ estado: true }),

        CategoriaModel.find({ estado: true })
          .populate('usuario', 'nombre')
          .skip(Number(desde))
          .limit(Number(limite))
      ])

      res.json({ total, categorias })
    } catch (error) {
      res.status(500).json({ err: 'Error en el servidor' })
    }
  }

  // ObtenerCategoria - populate
  static getCategory = async (req = request, res = response) => {
    try {
      const { id } = req.params
      const getCategory = await CategoriaModel.findById(id).populate('usuario', 'nombre')
      res.json({ getCategory })
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: 'Error en el servidor' })
    }
  }

  static crearCategoria = async (req = request, res = response) => {
    try {
      const nombre = req.body.nombre.toUpperCase()

      const categoriaDB = await CategoriaModel.findOne({ nombre })
      if (categoriaDB) return res.status(400).json({ msg: `La categoria ${categoriaDB.nombre}, ya existe` })

      // Generar la data a guardar
      const data = {
        nombre,
        usuario: req.userAuth._id
      }

      const categoria = new CategoriaModel(data)

      // Guardar en DB
      await categoria.save()

      res.status(201).json(categoria)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: 'Error en el servidor' })
    }
  }

  // actualizarCategoria
  static updateCateogory = async (req = request, res = response) => {
    try {
      const { id } = req.params
      const { estado, usuario, ...data } = req.body

      data.nombre = data.nombre.toUpperCase()
      data.usuario = req.userAuth._id

      const categoria = await CategoriaModel.findByIdAndUpdate(id, data, { new: true })

      res.json({ categoria })
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: 'Error en el servidor' })
    }
  }

  // BorrarCategoria
  static deleteCateogory = async (req = request, res = response) => {
    try {
      const { id } = req.params

      const categoria = await CategoriaModel.findByIdAndUpdate(id, { estado: false })
      const usuarioAuth = req.userAuth

      res.json({ usuarioAuth, categoria })
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: 'Erro en el servidor' })
    }
  }
}
