import { Router } from 'express'
const deviceRoutes = Router()

import { post, get, _delete } from '../controllers/device.js'

deviceRoutes.post('/', post)
deviceRoutes.get('/', get)
deviceRoutes.delete('/:id', _delete)

export default deviceRoutes