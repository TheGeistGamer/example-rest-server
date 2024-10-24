import { Schema, model } from 'mongoose'

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    require: [true, 'El nombre el obligatorio']
  },

  correo: {
    type: String,
    require: [true, 'El correo es obligatorio'],
    unique: true
  },

  password: {
    type: String,
    require: [true, 'La contraseña es obligatoria']
  },

  img: {
    type: String
  },

  rol: {
    type: String,
    require: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },

  estado: {
    type: Boolean,
    default: true
  },

  google: {
    type: Boolean,
    default: false
  }
})

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject()
  usuario.uid = _id
  return usuario
}

export const Usuario = model('Usuario', UsuarioSchema)
