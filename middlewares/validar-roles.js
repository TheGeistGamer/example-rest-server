import { request, response } from 'express'

export const isAdminRole = (req = request, res = response, next) => {
  if (!req.userAuth) return res.status(500).json({ err: 'Error del servidor' })

  const { rol, nombre } = req.userAuth

  if (rol !== 'ADMIN_ROLE') return res.status(401).json({ err: `${nombre} no tienes permitido hacer esto` })

  next()
}

export const haveRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.userAuth) return res.status(500).json({ err: 'Error del servidor' })

    const { rol } = req.userAuth
    if (!roles.includes(rol)) return res.status(401).json({ err: 'No tienes los permisos' })

    next()
  }
}
