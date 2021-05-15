import { Router } from 'express'
const categoryRoutes = Router()

import { post, get, _delete } from '../controllers/category.js'

categoryRoutes.post('/', post)
categoryRoutes.get('/', get)
categoryRoutes.delete('/:id', _delete)

export default categoryRoutes