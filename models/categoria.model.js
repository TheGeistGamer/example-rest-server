import { Schema, model } from 'mongoose'

const CategoriaSchema = new Schema({
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
  }
})

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

export const CategoriaModel = model('Categoria', CategoriaSchema)
