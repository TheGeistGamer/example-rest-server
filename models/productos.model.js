import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
  nombre: {
    type: String,
    require: [true, 'El nombre es obligatorio'],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
  precio: {
    type: Number,
    default: 0
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    require: true
  },
  descripcion: { type: String },
  disponible: { type: Boolean, default: true },
  img: { type: String }
})

ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

export const ProductModel = model('Producto', ProductSchema)
