import { CategoriaModel, ProductModel, RoleModel, Usuario } from '../models/index.js'

export const esRoleValido = async (rol = '') => {
  const existeRol = await RoleModel.findOne({ rol })
  if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la DB`)
}

export const emailExisting = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo })
  if (existeEmail) throw new Error('El correo ya esta registrado')
}

export const existeUsuarioById = async (id) => {
  // Verificar si el correo exite
  const existUser = await Usuario.findById(id)
  if (!existUser) throw new Error('El id del usuario no existe')
}

export const existeCategory = async (id) => {
  const existCategory = await CategoriaModel.findById(id)
  if (!existCategory) throw new Error('La categoria no existe!')
}

export const existProduct = async (id) => {
  const existProduct = await ProductModel.findById(id)
  if (!existProduct) throw new Error('El Producto no existe!')
}

export const existName = async (name) => {
  const nombre = name.toUpperCase()
  const productoDB = await ProductModel.find({ nombre })
  if (productoDB.length > 0) throw new Error('El producto ya existe')
}

// Validar colecciones permitidas
export const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion)
  if (!incluida) throw new Error(`La coleccion ${coleccion} no es permitida ${colecciones}`)

  return true
}
