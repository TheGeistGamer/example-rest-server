/* eslint-disable prefer-promise-reject-errors */
import { randomUUID } from 'crypto'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'webp'], carpeta = '') => {
  return new Promise((resolve, reject) => {
    const { archivo } = files

    // Sacar el su extencion
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1]

    // Filtar por archivos permitidos
    if (!extensionesValidas.includes(extension)) return reject(`La extencion ${extension} no es permitida`)

    // Generar nuevo nombre
    const nombreTemp = randomUUID() + '.' + extension
    // Generar path
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

    // Mover a la carpeta de destino
    archivo.mv(uploadPath, (err) => {
      if (err) return reject(err)

      resolve(uploadPath)
    })
  })
}
